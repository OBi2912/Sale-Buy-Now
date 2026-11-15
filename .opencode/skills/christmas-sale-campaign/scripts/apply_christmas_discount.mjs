#!/usr/bin/env node
/**
 * Aplica o revierte el descuento navideño sobre los precios de producto de
 * index.html.
 *
 * Reglas:
 * - Solo modifica los <p class="price"> dentro de <div class="price-box">.
 * - El precio base se guarda en data-christmas-base para que la operación sea
 *   idempotente: ejecutar el script dos veces no acumula descuentos.
 * - El precio original se muestra en <del>.
 * - El precio nunca baja de $1.00.
 *
 * Uso:
 *   node apply_christmas_discount.mjs --percent 25
 *   node apply_christmas_discount.mjs --percent 25 --dry-run
 *   node apply_christmas_discount.mjs --check --percent 25
 *   node apply_christmas_discount.mjs --revert
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);

function getOption(name, fallback) {
  const withEquals = args.find((arg) => arg.startsWith(`${name}=`));
  if (withEquals) return withEquals.slice(name.length + 1);

  const index = args.indexOf(name);
  if (index !== -1 && args[index + 1] && !args[index + 1].startsWith('--')) {
    return args[index + 1];
  }

  return fallback;
}

const percent = Number.parseFloat(getOption('--percent', '25'));
const file = resolve(getOption('--file', 'index.html'));
const dryRun = args.includes('--dry-run');
const checkOnly = args.includes('--check');
const revert = args.includes('--revert');

if (!Number.isFinite(percent) || percent <= 0 || percent >= 100) {
  console.error('El porcentaje debe ser un número mayor que 0 y menor que 100.');
  process.exit(1);
}

if (checkOnly && revert) {
  console.error('Usa --check o --revert, no ambos.');
  process.exit(1);
}

const round2 = (value) => Math.round((value + Number.EPSILON) * 100) / 100;
const formatPrice = (value) => `$${value.toFixed(2)}`;

function parsePrice(value) {
  const match = String(value).match(/\d+(?:\.\d+)?/);
  return match ? Number.parseFloat(match[0]) : null;
}

function escapeAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

const PRICE_BOX = /<div class="price-box">([\s\S]*?)<\/div>/g;
const PRICE_TAG = /<p class="price"([^>]*)>([\s\S]*?)<\/p>/;
const DEL_TAG = /<del([^>]*)>([\s\S]*?)<\/del>/;

function salePriceFor(base) {
  return Math.max(1, round2(base * (1 - percent / 100)));
}

function updateBox(inner) {
  const priceMatch = inner.match(PRICE_TAG);
  if (!priceMatch) {
    return { inner, status: 'skipped', reason: 'sin .price' };
  }

  const [, priceAttributes, priceText] = priceMatch;
  const baseAttribute = priceAttributes.match(/\bdata-christmas-base="([^"]+)"/);
  const base = baseAttribute ? Number.parseFloat(baseAttribute[1]) : parsePrice(priceText);

  if (!Number.isFinite(base) || base <= 0) {
    return { inner, status: 'skipped', reason: 'precio inválido' };
  }

  if (checkOnly) {
    if (!baseAttribute) {
      return { inner, status: 'fail', reason: 'falta data-christmas-base' };
    }

    const expected = formatPrice(salePriceFor(base));
    if (priceText.trim() !== expected) {
      return {
        inner,
        status: 'fail',
        reason: `precio ${priceText.trim()} distinto de ${expected}`,
      };
    }

    const delMatch = inner.match(DEL_TAG);
    if (!delMatch || parsePrice(delMatch[2]) !== base) {
      return { inner, status: 'fail', reason: 'el precio original no coincide con la base' };
    }

    return { inner, status: 'ok', reason: '' };
  }

  if (revert) {
    if (!baseAttribute) {
      return { inner, status: 'skipped', reason: 'sin aplicar' };
    }

    const restoredPrice = formatPrice(base);
    const restoredAttributes = priceAttributes.replace(/\s*data-christmas-base="[^"]*"/, '');
    let nextInner = inner.replace(
      priceMatch[0],
      `<p class="price"${restoredAttributes}>${restoredPrice}</p>`
    );

    const delMatch = nextInner.match(DEL_TAG);
    if (delMatch) {
      const [, delAttributes, delText] = delMatch;

      if (/\bdata-christmas-added="true"/.test(delAttributes)) {
        nextInner = nextInner.replace(delMatch[0], '');
      } else {
        const originalDel = delAttributes.match(/\bdata-christmas-original-del="([^"]*)"/);
        const restoredDelAttributes = delAttributes
          .replace(/\s*data-christmas-original-del="[^"]*"/, '')
          .replace(/\s*data-christmas-discount="true"/, '');

        nextInner = nextInner.replace(
          delMatch[0],
          `<del${restoredDelAttributes}>${originalDel ? originalDel[1] : delText.trim()}</del>`
        );
      }
    }

    return { inner: nextInner, status: 'reverted', base };
  }

  const salePrice = salePriceFor(base);
  let nextPriceAttributes = priceAttributes;
  if (!baseAttribute) {
    nextPriceAttributes += ` data-christmas-base="${base.toFixed(2)}"`;
  }

  const nextPriceTag = `<p class="price"${nextPriceAttributes}>${formatPrice(salePrice)}</p>`;
  let nextInner = inner.replace(priceMatch[0], nextPriceTag);

  const delMatch = nextInner.match(DEL_TAG);
  if (delMatch) {
    const [, delAttributes, delText] = delMatch;
    let nextDelAttributes = delAttributes;

    if (!/\bdata-christmas-original-del="/.test(delAttributes)) {
      nextDelAttributes += ` data-christmas-original-del="${escapeAttribute(delText.trim())}"`;
    }

    nextDelAttributes = nextDelAttributes.replace(/\s*data-christmas-added="true"/, '');
    nextInner = nextInner.replace(
      delMatch[0],
      `<del${nextDelAttributes}>${formatPrice(base)}</del>`
    );
  } else {
    nextInner = nextInner.replace(
      priceMatch[0],
      `<del data-christmas-added="true">${formatPrice(base)}</del>${nextPriceTag}`
    );
  }

  return { inner: nextInner, status: 'applied', base, salePrice };
}

let source;
try {
  source = readFileSync(file, 'utf8');
} catch (error) {
  console.error(`No se pudo leer ${file}: ${error.message}`);
  process.exit(1);
}

const totalBoxes = (source.match(/<div class="price-box">/g) || []).length;
if (totalBoxes === 0) {
  console.error('No se encontraron bloques .price-box en el archivo.');
  process.exit(1);
}

const counts = { applied: 0, reverted: 0, ok: 0, skipped: 0, fail: 0 };
const failures = [];
let processed = 0;

const updatedSource = source.replace(PRICE_BOX, (match, inner) => {
  processed += 1;
  const result = updateBox(inner);

  if (result.status === 'fail') {
    failures.push(`Producto ${processed}: ${result.reason}`);
  }
  if (Object.hasOwn(counts, result.status)) {
    counts[result.status] += 1;
  }

  return `<div class="price-box">${result.inner}</div>`;
});

if (checkOnly) {
  console.log(`Bloques de precio encontrados: ${totalBoxes}`);
  console.log(`Correctos: ${counts.ok} · Con fallos: ${counts.fail} · Omitidos: ${counts.skipped}`);
  if (counts.ok !== totalBoxes || failures.length) {
    failures.slice(0, 20).forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  process.exit(0);
}

if (processed !== totalBoxes) {
  console.error(`Se procesaron ${processed} bloques de ${totalBoxes}. No se escribió el archivo.`);
  process.exit(1);
}

if (dryRun) {
  console.log(`Simulación: ${file}`);
  console.log(`Porcentaje: ${percent}% · Bloques: ${totalBoxes}`);
  console.log(
    revert
      ? `Se revertirían: ${counts.reverted} · Omitidos: ${counts.skipped}`
      : `Se aplicarían: ${counts.applied} · Omitidos: ${counts.skipped}`
  );
  process.exit(0);
}

writeFileSync(file, updatedSource, 'utf8');

console.log(`Archivo actualizado: ${file}`);
console.log(`Porcentaje: ${percent}% · Bloques de precio: ${totalBoxes}`);
console.log(
  revert
    ? `Revertidos: ${counts.reverted} · Omitidos: ${counts.skipped}`
    : `Aplicados: ${counts.applied} · Omitidos: ${counts.skipped}`
);
