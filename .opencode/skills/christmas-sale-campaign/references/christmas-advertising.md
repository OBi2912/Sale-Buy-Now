# Publicidad navideña de Sale Buy Now

Snippets y copys para aplicar la campaña. Úsalos junto con `SKILL.md`.

## Contenido

- [Mapa de inserción](#mapa-de-inserción)
- [Calendario anual](#0-calendario-anual)
- [Barra promocional](#1-barra-promocional)
- [Distintivo del hero](#2-distintivo-del-hero)
- [CTA navideño](#3-cta-navideño)
- [Estilos](#4-estilos)
- [Contador](#5-contador)
- [Copys EN / ES / FR](#6-copys-en--es--fr)
- [Accesibilidad y tono](#7-accesibilidad-y-tono)

## Mapa de inserción

| Pieza | Archivo | Punto de inserción |
| --- | --- | --- |
| Calendario anual | `assets/js/christmas-campaign.js` | Cargado en el `<head>` de `index.html` |
| Barra promocional + contador | `index.html` | Justo antes de `<header>` |
| Distintivo de Navidad | `index.html` | Primer `.slider-item .banner-content`, antes de `.banner-subtitle` |
| CTA navideño | `index.html` | `.cta-container`, dentro de `#products` |
| Estilos | `assets/css/style-prefix.css` | Nueva sección `#CHRISTMAS CAMPAIGN`, antes de los `@media` finales |
| Contador | `assets/js/script.js` | Dentro del `DOMContentLoaded`, después de las utilidades de idioma |
| Copys | `assets/js/i18n.js` | En los objetos `en-US`, `es-ES` y `fr` |

## 0. Calendario anual

La campaña se repite **del 15 de noviembre al 5 de enero a las 23:59:59**. La fuente de verdad es `assets/js/christmas-campaign.js`; cárgala en el `<head>` para que la web no muestre publicidad fuera de temporada ni parpadee al cargar.

```html
<script src="./assets/js/christmas-campaign.js"></script>
```

No uses años fijos en `data-ends-at`. `script.js` llama a `ChristmasCampaign.getCampaignWindow()` para mostrar/ocultar la publicidad, aplicar o revertir los precios y calcular el contador. Fuera de la ventana, el HTML vuelve a los precios de `data-christmas-base`.

## 1. Barra promocional

Insertar antes de `<header>`:

```html
<aside class="christmas-promo" data-christmas-promo>
  <div class="container christmas-promo-inner">
    <p class="christmas-promo-text">
      <ion-icon name="sparkles-outline" aria-hidden="true"></ion-icon>
      <span data-i18n="christmas_promo">Christmas Sale · 25% off sitewide</span>
    </p>

    <div class="christmas-countdown" data-christmas-countdown>
      <span class="christmas-countdown-label" data-i18n="christmas_ends">Ends in</span>
      <span class="christmas-countdown-value" data-christmas-countdown-value aria-live="off">--d --h --m --s</span>
    </div>

    <a href="#products" class="christmas-promo-btn" data-i18n="christmas_shop">Shop the sale</a>
  </div>
</aside>
```

Si el usuario da otra fecha de fin, cámbiala en `assets/js/christmas-campaign.js`. El contador se calcula solo y no necesita un año fijo en el HTML.

## 2. Distintivo del hero

Dentro del primer `.slider-item`, al inicio de `.banner-content`:

```html
<p class="christmas-hero-badge">
  <ion-icon name="gift-outline" aria-hidden="true"></ion-icon>
  <span data-i18n="christmas_hero_badge">Christmas Sale · 25% off</span>
</p>
```

No cambies las imágenes ni la estructura del slider. El distintivo debe quedar por encima del subtítulo existente.

## 3. CTA navideño

Añade la clase `christmas-cta` al `.cta-container` y actualiza los textos:

```html
<div class="cta-container christmas-cta">
  <img src="./assets/images/cta-banner.jpg" alt="Christmas gift collection" class="cta-banner">

  <a href="#products" class="cta-content">
    <p class="discount" data-i18n="christmas_cta_badge">Christmas Sale · 25% off</p>
    <h2 class="cta-title" data-i18n="christmas_cta_title">Gifts they'll love</h2>
    <p class="cta-text" data-i18n="christmas_cta_text">Christmas deals from $3</p>
    <button class="cta-btn" data-i18n="christmas_cta_btn">Shop the Christmas sale</button>
  </a>
</div>
```

Conserva la estructura y las clases existentes; solo añade `christmas-cta` y los `data-i18n`. El precio “desde” debe calcularse con el precio más bajo después del descuento, no inventarse.

## 4. Estilos

Añadir en `assets/css/style-prefix.css`, en una sección claramente marcada:

```css
/*-----------------------------------*\
  #CHRISTMAS CAMPAIGN
\*-----------------------------------*/

.christmas-promo {
  background: linear-gradient(90deg, #14532d 0%, #7f1d1d 58%, #b3261e 100%);
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
}

.christmas-promo-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 18px;
  padding: 9px 0;
}

.christmas-promo-text {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #ffffff;
  font-size: var(--fs-8);
  font-weight: var(--weight-600);
  letter-spacing: 0.2px;
}

.christmas-promo-text ion-icon {
  color: #f2c14e;
  font-size: 17px;
}

.christmas-countdown {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #ffffff;
  font-size: var(--fs-9);
}

.christmas-countdown-label {
  color: rgba(255, 255, 255, 0.78);
}

.christmas-countdown-value {
  min-width: 108px;
  padding: 3px 9px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 99px;
  font-variant-numeric: tabular-nums;
  font-weight: var(--weight-600);
  text-align: center;
}

.christmas-promo-btn {
  padding: 6px 14px;
  border-radius: 99px;
  background: #f2c14e;
  color: #3b1d0e;
  font-size: var(--fs-9);
  font-weight: var(--weight-700);
  text-decoration: none;
  text-transform: uppercase;
  transition: var(--transition-timing);
}

.christmas-promo-btn:hover {
  background: #ffffff;
  color: #7f1d1d;
}

.christmas-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  margin-bottom: 10px;
  padding: 6px 11px;
  border-radius: 99px;
  background: #b3261e;
  color: #ffffff;
  font-size: var(--fs-10);
  font-weight: var(--weight-700);
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.christmas-hero-badge ion-icon {
  color: #f2c14e;
  font-size: 14px;
}

.christmas-cta .cta-content {
  background: rgba(127, 29, 29, 0.92);
}

.christmas-cta .cta-content .discount {
  background: #f2c14e;
  color: #3b1d0e;
}

.christmas-cta .cta-title {
  color: #ffffff;
}

.christmas-cta .cta-text,
.christmas-cta .cta-btn {
  color: rgba(255, 255, 255, 0.9);
}

.christmas-cta .cta-btn:hover {
  color: #f2c14e;
}
```

Para móvil, añadir dentro de los `@media` existentes (768px y 480px):

```css
@media (max-width: 768px) {
  .christmas-promo-inner {
    gap: 6px 12px;
    padding: 8px 0;
  }

  .christmas-promo-text {
    font-size: var(--fs-9);
  }

  .christmas-cta .cta-content {
    width: calc(100% - 20px);
  }
}

@media (max-width: 480px) {
  .christmas-countdown {
    display: none;
  }

  .christmas-promo-btn {
    padding: 5px 11px;
  }
}
```

No uses animaciones de nieve a pantalla completa. Si añades algún detalle decorativo, que sea sutil y se desactive con:

```css
@media (prefers-reduced-motion: reduce) {
  .christmas-promo * {
    animation: none !important;
    transition: none !important;
  }
}
```

## 5. Contador

Añadir en `assets/js/script.js` dentro del `DOMContentLoaded`, después de las funciones de idioma:

```js
// Christmas campaign: annual window from November 15 to January 5
const christmasCampaign = window.ChristmasCampaign;
const christmasCountdown = document.querySelector('[data-christmas-countdown]');
const christmasCountdownValue = document.querySelector('[data-christmas-countdown-value]');
let countdownTimer = null;

function startChristmasCountdown(endDate) {
  if (!christmasCountdown || !christmasCountdownValue || !endDate) return;
  if (countdownTimer) clearInterval(countdownTimer);

  const renderChristmasCountdown = () => {
    const remaining = endDate.getTime() - Date.now();

    if (remaining <= 0) {
      christmasCountdownValue.textContent = getTranslation('christmas_ended', 'Offer ended');
      if (countdownTimer) clearInterval(countdownTimer);
      countdownTimer = null;
      refreshChristmasCampaign();
      return;
    }

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor(remaining / 3600000) % 24;
    const minutes = Math.floor(remaining / 60000) % 60;
    const seconds = Math.floor(remaining / 1000) % 60;
    const pad = (value) => String(value).padStart(2, '0');

    christmasCountdownValue.textContent =
      `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  };

  renderChristmasCountdown();
  countdownTimer = setInterval(renderChristmasCountdown, 1000);
}

const campaignWindow = christmasCampaign?.getCampaignWindow();
if (campaignWindow?.active) startChristmasCountdown(campaignWindow.end);
```

`refreshChristmasCampaign()` es la función que muestra u oculta la barra, el distintivo y el CTA, y aplica o revierte los precios. Puedes ver la implementación completa en `assets/js/script.js`. No uses `aria-live` en el contador: cambia cada segundo y sería molesto para lectores de pantalla.

## 6. Copys EN / ES / FR

Sustituye `{discount}` por el porcentaje real y `{minPrice}` por el precio más bajo después del descuento. Mantén las mismas claves en los tres idiomas.

| Clave | English (`en-US`) | Español (`es-ES`) | Français (`fr`) |
| --- | --- | --- | --- |
| `christmas_promo` | Christmas Sale · {discount}% off sitewide | Venta de Navidad · {discount}% de descuento en todo | Soldes de Noël · {discount} % de réduction sur tout |
| `christmas_shop` | Shop the sale | Ver la oferta | Voir l'offre |
| `christmas_ends` | Ends in | Termina en | Se termine dans |
| `christmas_hero_badge` | Christmas Sale · {discount}% off | Venta de Navidad · {discount}% de descuento | Soldes de Noël · {discount} % de réduction |
| `christmas_cta_badge` | Christmas Sale · {discount}% off | Venta de Navidad · {discount}% de descuento | Soldes de Noël · {discount} % de réduction |
| `christmas_cta_title` | Gifts they'll love | Regalos que enamorarán | Des cadeaux qui font plaisir |
| `christmas_cta_text` | Christmas deals from {minPrice} | Ofertas navideñas desde {minPrice} | Offres de Noël à partir de {minPrice} |
| `christmas_cta_btn` | Shop the Christmas sale | Ver la venta de Navidad | Voir les soldes de Noël |
| `christmas_ended` | Offer ended | Oferta finalizada | Offre terminée |

Ejemplo en `en-US`:

```js
"christmas_promo": "Christmas Sale · 25% off sitewide",
"christmas_shop": "Shop the sale",
"christmas_ends": "Ends in",
"christmas_hero_badge": "Christmas Sale · 25% off",
"christmas_cta_badge": "Christmas Sale · 25% off",
"christmas_cta_title": "Gifts they'll love",
"christmas_cta_text": "Christmas deals from $3",
"christmas_cta_btn": "Shop the Christmas sale",
"christmas_ended": "Offer ended",
```

## 7. Accesibilidad y tono

- Usa texto además del color rojo/verde; no dependas solo del color para comunicar la oferta.
- Mantén el contraste de texto blanco sobre los fondos rojo y verde.
- No añadas otra modal ni un popup de Navidad: la tienda ya muestra la modal de newsletter.
- No ocultes el contenido principal ni tapes el header con la barra promocional.
- En móvil, la barra debe poder envolver el texto sin desbordarse.
- Prueba en modo claro y oscuro; la barra y el CTA deben seguir siendo legibles.
