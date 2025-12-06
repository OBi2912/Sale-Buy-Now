'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // Load cart from local storage
    let cart = JSON.parse(localStorage.getItem('shopping-cart')) || [];
    const orderSummaryContainer = document.getElementById('order-summary-items');
    const orderTotalPriceElement = document.getElementById('order-total-price');
    const checkoutForm = document.getElementById('checkout-form');

    // Render order summary
    function renderOrderSummary() {
        if (!orderSummaryContainer) return;

        if (cart.length === 0) {
            orderSummaryContainer.innerHTML = '<p>Your cart is empty.</p>';
            if (orderTotalPriceElement) orderTotalPriceElement.textContent = '$0.00';
            return;
        }

        let cartHTML = '';
        let total = 0;

        const lang = localStorage.getItem('language') || 'en-US';
        const removeText = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang]['remove_product'] : 'Remove Product';

        cart.forEach(item => {
            const priceString = item.price.replace(/[^0-9.]/g, '');
            const itemPrice = parseFloat(priceString);
            const itemTotal = (isNaN(itemPrice) ? 0 : itemPrice) * item.quantity;
            total += itemTotal;

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
        if (orderTotalPriceElement) {
            orderTotalPriceElement.textContent = '$' + total.toFixed(2);
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

                // Redirect to home page
                window.location.href = 'index.html';
            }, 2000);
        });
    }

});
