'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // Load cart from local storage
    let cart = JSON.parse(localStorage.getItem('shopping-cart')) || [];
    const orderSummaryContainer = document.getElementById('order-summary-items');
    const orderTotalPriceElement = document.getElementById('order-total-price');
    const orderSubtotalPriceElement = document.getElementById('order-subtotal-price');
    const orderShippingPriceElement = document.getElementById('order-shipping-price');
    const orderDiscountLine = document.getElementById('order-discount-line');
    const orderDiscountPriceElement = document.getElementById('order-discount-price');
    const checkoutForm = document.getElementById('checkout-form');

    // Coupon and shipping configuration (must match script.js)
    const COUPONS = {
        SAVE10: 10,
        SAVE20: 20,
        WELCOME15: 15
    };
    const FREE_SHIPPING_THRESHOLD = 55;
    const SHIPPING_FEE = 4.99;
    const couponCode = localStorage.getItem('shopping-cart-coupon') || null;

    function formatPrice(value) {
        return '$' + value.toFixed(2);
    }

    // Render order summary
    function renderOrderSummary() {
        if (!orderSummaryContainer) return;

        if (cart.length === 0) {
            orderSummaryContainer.innerHTML = '<p>Your cart is empty.</p>';
            if (orderSubtotalPriceElement) orderSubtotalPriceElement.textContent = formatPrice(0);
            if (orderShippingPriceElement) orderShippingPriceElement.textContent = '\u2014';
            if (orderDiscountLine) orderDiscountLine.classList.add('hidden');
            if (orderTotalPriceElement) orderTotalPriceElement.textContent = formatPrice(0);
            return;
        }

        let cartHTML = '';
        let subtotal = 0;

        const lang = localStorage.getItem('language') || 'en-US';
        const removeText = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang]['remove_product'] : 'Remove Product';

        cart.forEach(item => {
            const priceString = String(item.price).replace(/[^0-9.]/g, '');
            const itemPrice = parseFloat(priceString);
            const itemTotal = (isNaN(itemPrice) ? 0 : itemPrice) * item.quantity;
            subtotal += itemTotal;

            cartHTML += `
        <div class="order-summary-item">
          <div style="display: flex; align-items: center;">
            <img src="${item.image}" alt="${item.title}">
            <div class="item-info">
              <div class="item-title">${item.title}</div>
              <div class="item-qty">Qty: ${item.quantity}</div>
              <button class="remove-item-btn" data-id="${item.id}" style="color: var(--bittersweet); font-size: var(--fs-9); background: none; border: none; cursor: pointer; padding: 0; margin-top: 5px; text-decoration: underline;">${removeText}</button>
            </div>
          </div>
          <div class="item-price">${item.price}</div>
        </div>
      `;
        });

        orderSummaryContainer.innerHTML = cartHTML;

        const discountPercent = couponCode && COUPONS[couponCode] ? COUPONS[couponCode] : 0;
        const discount = subtotal * discountPercent / 100;
        const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
        const total = Math.max(0, subtotal - discount + shipping);

        if (orderSubtotalPriceElement) {
            orderSubtotalPriceElement.textContent = formatPrice(subtotal);
        }

        if (orderShippingPriceElement) {
            if (shipping === 0) {
                const freeText = (typeof translations !== 'undefined' && translations[lang] && translations[lang]['free']) ?
                    translations[lang]['free'] : 'Free';
                orderShippingPriceElement.textContent = freeText;
                orderShippingPriceElement.parentElement.classList.add('is-free');
            } else {
                orderShippingPriceElement.textContent = formatPrice(shipping);
                orderShippingPriceElement.parentElement.classList.remove('is-free');
            }
        }

        if (orderDiscountLine && orderDiscountPriceElement) {
            if (discount > 0) {
                orderDiscountLine.classList.remove('hidden');
                orderDiscountPriceElement.textContent = '-' + formatPrice(discount);
            } else {
                orderDiscountLine.classList.add('hidden');
            }
        }

        if (orderTotalPriceElement) {
            orderTotalPriceElement.textContent = formatPrice(total);
        }

        // Add event listeners for remove buttons
        const removeBtns = orderSummaryContainer.querySelectorAll('.remove-item-btn');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                removeFromCart(id);
            });
        });
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('shopping-cart', JSON.stringify(cart));
        renderOrderSummary();
    }

    renderOrderSummary();

    // Handle payment method toggle
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const paymentForms = {
        'credit_card': document.getElementById('credit_card_form'),
        'paypal': document.getElementById('paypal_form'),
        'cod': document.getElementById('cod_form')
    };

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            // Hide all forms
            Object.values(paymentForms).forEach(form => {
                if (form) form.classList.add('hidden');
            });

            // Show selected form
            const selectedForm = paymentForms[this.value];
            if (selectedForm) {
                selectedForm.classList.remove('hidden');
            }
        });
    });

    // Handle form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            // Simulate processing
            const btn = checkoutForm.querySelector('.btn-place-order');
            const originalText = btn.textContent;
            btn.textContent = 'Processing...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your order! Your payment has been processed successfully.');

                // Clear cart
                localStorage.removeItem('shopping-cart');
                localStorage.removeItem('shopping-cart-coupon');

                // Redirect to home page
                window.location.href = 'index.html?from=checkout';
            }, 2000);
        });
    }

    // Theme Toggle Logic
    const themeBtns = document.querySelectorAll('[data-theme-btn]');
    const html = document.documentElement;
    const moonIcons = document.querySelectorAll('.moon-icon');
    const sunIcons = document.querySelectorAll('.sun-icon');

    function updateThemeIcons(theme) {
        if (theme === 'dark') {
            moonIcons.forEach(icon => icon.style.display = 'none');
            sunIcons.forEach(icon => icon.style.display = 'block');
        } else {
            moonIcons.forEach(icon => icon.style.display = 'block');
            sunIcons.forEach(icon => icon.style.display = 'none');
        }
    }

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

});
