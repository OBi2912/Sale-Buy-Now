---
name: Campaña de Navidad
description: Aplica o revierte la campaña navideña de Sale Buy Now. Recalcula de forma idempotente los precios de todos los productos (25% por defecto), conserva el precio original tachado, sincroniza carrito/favoritos/checkout y añade publicidad navideña (barra promocional, distintivo en el hero, CTA, contador y copys en inglés, español y francés). Úsala siempre que el usuario pida una rebaja de Navidad, precios navideños, descuento de temporada, campaña de Navidad, Christmas sale o publicidad navideña para esta tienda, aunque no mencione un archivo concreto.
---

# Campaña de Navidad

Esta skill aplica una campaña estacional completa a la tienda estática **Sale Buy Now**:

- Rebaja los 42 productos de `index.html` sin acumular descuentos si se ejecuta varias veces.
- Muestra el precio original tachado y el precio de oferta.
- Mantiene coherentes la vista rápida, el carrito, los favoritos y el checkout.
- Añade publicidad navideña integrada en el diseño existente, sin otra modal ni popup intrusivo.
- Traduce todos los textos nuevos al inglés, español y francés.

## Valores por defecto

| Parámetro | Valor |
| --- | --- |
| Descuento | `25%` |
| Inicio de temporada | 15 de noviembre |
| Fin de temporada | 6 de enero del año siguiente, 23:59:59 |
| Moneda | USD |
| Idiomas | `en-US`, `es-ES`, `fr` |
| Archivo de precios | `index.html` |

Si el usuario no indica un porcentaje, usa **25%** y dilo en el resumen final. Si indica otro, úsalo en los precios, en los textos y en la verificación. No cambies los cupones (`SAVE10`, `SAVE20`, `WELCOME15`), el umbral de envío gratis (`$55`) ni la tarifa de envío (`$4.99`).

## Archivos que intervienen

| Archivo | Uso |
| --- | --- |
| `index.html` | Precios de producto, barra promocional, hero, CTA y modal de vista rápida |
| `assets/css/style-prefix.css` | Estilos de la campaña y responsive |
| `assets/js/script.js` | Vista rápida, sincronización de precios guardados y contador |
| `assets/js/i18n.js` | Copys en inglés, español y francés |
| `checkout.html` | Solo para verificar que los totales reflejan el precio de oferta |
| `assets/js/checkout.js` | No requiere cambios: lee el precio guardado en el carrito |

`index.html` y `checkout.html` cargan `assets/css/style-prefix.css`. No edites `assets/css/style.css`: no está enlazado.

## Reglas de precios

1. El precio de venta actual es el texto de `.price` dentro de `.price-box`. Hay 42 productos.
2. No uses `<del>` como precio base. Los datos actuales son inconsistentes: en algunas tarjetas el `del` es menor que el precio actual. El precio base debe ser el `.price` actual la primera vez.
3. Guarda la base en `data-christmas-base` sobre el propio `.price`. Así, volver a ejecutar la skill recalcula desde la base y **no acumula** rebajas.
4. Calcula `precio = max(1, round2(base * (1 - porcentaje / 100)))`. Formatea siempre con dos decimales y símbolo `$`.
5. El `<del>` debe mostrar el precio base. Guarda el contenido original del `del` en `data-christmas-original-del` para poder revertir.
6. No toques:
   - El placeholder `$0.00` de `.product-modal-price` y `.product-modal-del`.
   - El `$55` del envío gratis.
   - El `$10` del CTA antiguo si todavía existe fuera del bloque navideño.
   - Los valores de cupones.
   - Precios dentro de textos legales o de blog.
7. El script solo modifica `.price` dentro de `.price-box`; no hagas un reemplazo global de `$`.

### Script de precios

El script incluido aplica, comprueba y revierte el descuento:

```bash
# Simular sin escribir
node .opencode/skills/christmas-sale-campaign/scripts/apply_christmas_discount.mjs \
  --percent 25 --dry-run

# Aplicar
node .opencode/skills/christmas-sale-campaign/scripts/apply_christmas_discount.mjs \
  --percent 25

# Verificar que los 42 precios son correctos
node .opencode/skills/christmas-sale-campaign/scripts/apply_christmas_discount.mjs \
  --check --percent 25

# Revertir a los precios base
node .opencode/skills/christmas-sale-campaign/scripts/apply_christmas_discount.mjs \
  --revert
```

El script imprime cuántos productos aplicó u omitió. Si el conteo no es 42, detente y revisa el HTML antes de continuar. Para probar el revert sin riesgo, copia `index.html` a un archivo temporal y pásalo con `--file`.

## Flujo de trabajo

### 1. Reconocer el estado

Antes de cambiar nada:

```bash
git status --short
grep -c 'class="price-box"' index.html
grep -n 'data-christmas-base' index.html | head
```

- Si hay cambios sin confirmar del usuario, no los sobrescribas ni los reviertas.
- Si `data-christmas-base` ya existe, la campaña está aplicada. Pregunta si se debe recalcular con otro porcentaje o revertir antes de volver a aplicar.
- Si hay menos de 42 `.price-box`, el HTML cambió: localiza los productos nuevos y adáptate antes de ejecutar el script.

### 2. Aplicar los precios

Ejecuta el script con `--dry-run`, revisa el conteo y luego sin `--dry-run`. Después verifica con `--check`.

Comprueba una muestra manualmente:

```text
Producto base $4.00  → 25% → $3.00
Producto base $7.00  → 25% → $5.25
Producto base $45.00 → 25% → $33.75
```

Si el usuario pidió otro porcentaje, todos los textos y el cálculo deben usar ese mismo valor.

### 3. Mantener la vista rápida coherente

En `assets/js/script.js`:

- Añade `oldPrice` a `extractProductData()`:

```js
const title = titleElement.textContent.trim();
const oldPrice = showcase.querySelector('.price-box del')?.textContent.trim() || '';

return {
  id: id,
  title: title,
  price: price,
  oldPrice: oldPrice,
  image: img.src,
  alt: img.alt
};
```

El `id` se calcula a partir de `title`; si cambias el título, mantén la misma normalización (`toLowerCase().replace(/\s+/g, '-')`).

- En `renderProductModal(product)`, actualiza el precio tachado:

```js
if (modalDel) {
  modalDel.textContent = product.oldPrice || '';
  modalDel.hidden = !product.oldPrice;
}
```

La vista rápida debe mostrar el precio de oferta y, debajo o al lado, el precio base tachado. Si un producto no tiene `oldPrice`, oculta el `del` en lugar de mostrar `$0.00`.

### 4. Sincronizar precios guardados

El carrito y los favoritos guardan el precio como texto en `localStorage`. Si no se sincronizan, un usuario con una sesión anterior verá el precio viejo.

Añade esta función en `assets/js/script.js`, después de las declaraciones de `cart` y `favorites`. Usa `.trim()` al generar el id tanto aquí como en `extractProductData()` para que ambos coincidan:

```js
function syncStoredPrices() {
  const currentPrices = new Map();

  document.querySelectorAll('.showcase').forEach((card) => {
    const title = card.querySelector('.showcase-title')?.textContent.trim();
    const price = card.querySelector('.price')?.textContent.trim();
    if (!title || !price) return;

    const id = title.toLowerCase().replace(/\s+/g, '-');
    currentPrices.set(id, price);
  });

  const syncList = (list) => list.map((item) => {
    const currentPrice = currentPrices.get(item.id);
    return currentPrice ? { ...item, price: currentPrice } : item;
  });

  cart = syncList(cart);
  favorites = syncList(favorites);
  localStorage.setItem('shopping-cart', JSON.stringify(cart));
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
```

Llama a `syncStoredPrices()` antes del `updateCartCount(); renderCart(); renderFavorites();` del final del `DOMContentLoaded`. Así los precios guardados se actualizan al cargar la página y también se corrigen al revertir la campaña.

No borres el carrito ni los favoritos del usuario como atajo.

### 5. Añadir la publicidad navideña

Lee `references/christmas-advertising.md` y aplica sus snippets. Resume el trabajo así:

1. Barra promocional antes de `<header>` con el descuento, un contador y un botón que lleva a `#products`.
2. Distintivo navideño en el primer slide del hero, sin alterar las imágenes ni el carrusel.
3. CTA navideño en `.cta-container` con precios “desde” calculados a partir del producto más barato después del descuento.
4. Estilos en una sección `#CHRISTMAS CAMPAIGN` de `style-prefix.css`, con responsive en 768px y 480px.
5. Contador en `script.js` que lee `data-ends-at` y termina con el texto `christmas_ended`.
6. Copys en `assets/js/i18n.js` para `en-US`, `es-ES` y `fr`.

Pautas de diseño:

- Usa rojo, verde y dorado solo dentro de la campaña. No cambies los tokens globales `--salmon-pink` ni `--bittersweet`, porque son la identidad azul de la tienda.
- No añadas una modal ni un interstitial de Navidad. La tienda ya muestra la modal de newsletter; otra resultaría invasiva.
- No uses nieve animada a pantalla completa. Como mucho, un detalle decorativo sutil en la barra promocional.
- Respeta `prefers-reduced-motion`.
- La publicidad debe ser legible en modo claro y oscuro.
- El texto del descuento debe coincidir con el porcentaje real aplicado. Si el descuento es 30%, no dejes “25%” en ningún idioma.

### 6. Verificar

Ejecuta:

```bash
node --check assets/js/script.js
node --check assets/js/i18n.js
node .opencode/skills/christmas-sale-campaign/scripts/apply_christmas_discount.mjs --check --percent 25
```

Después abre la tienda con un servidor local y comprueba:

- Los 42 productos muestran precio de oferta y precio base tachado.
- Ningún precio es menor que `$1.00` ni mayor que su base.
- El producto más barato del CTA coincide con el precio real más bajo.
- La vista rápida muestra ambos precios.
- Añadir al carrito usa el precio de oferta.
- El subtotal, los cupones, el envío y el checkout usan el precio de oferta.
- Favoritos muestra el precio de oferta y sincroniza sesiones anteriores.
- La barra, el distintivo del hero y el CTA se ven bien en escritorio, tablet y móvil.
- El cambio de idioma actualiza todos los textos nuevos en EN/ES/FR.
- El contador avanza y, al llegar a la fecha final, muestra el mensaje de oferta finalizada.
- No hay errores en la consola.
- El modo oscuro mantiene el contraste.

Si algo falla, corrige y vuelve a ejecutar la verificación. No des la campaña por terminada solo porque el script haya escrito el archivo.

### 7. Revertir

Para deshacer solo los precios:

```bash
node .opencode/skills/christmas-sale-campaign/scripts/apply_christmas_discount.mjs --revert
```

Después elimina la barra promocional, el distintivo del hero, la clase `christmas-cta`, la sección CSS `#CHRISTMAS CAMPAIGN`, el bloque del contador en `script.js` y las claves `christmas_*` de los tres idiomas.

Si usas Git, revisa primero `git diff` y revierte solo los cambios de la campaña. No descartes cambios del usuario que ya estaban en el árbol de trabajo.

## Resumen final

Al terminar, informa en el idioma del usuario:

- Porcentaje aplicado y número de productos actualizados.
- Fechas de la campaña.
- Archivos modificados.
- Resultado de la verificación (precios, carrito, checkout, idiomas, responsive, consola).
- Cómo revertir la campaña.

Sé breve y concreto. No pegues listados enormes de precios; basta con ejemplos y el conteo.
