'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // modal variables
  const modal = document.querySelector('[data-modal]');
  const modalCloseBtn = document.querySelector('[data-modal-close]');
  const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

  // modal function
  const modalCloseFunc = function () {
    if (modal) modal.classList.add('closed');
  }

  // modal eventListener
  if (modalCloseOverlay) modalCloseOverlay.addEventListener('click', modalCloseFunc);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', modalCloseFunc);

  // newsletter modal show logic
  const showNewsletterModal = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromCheckout = urlParams.get('from') === 'checkout' || (document.referrer && document.referrer.includes('checkout.html'));
    const hasBeenShown = sessionStorage.getItem('newsletter_shown');

    if (!isFromCheckout && !hasBeenShown && modal) {
      modal.classList.remove('closed');
      sessionStorage.setItem('newsletter_shown', 'true');
    }
  }

  showNewsletterModal();

  // user modal variables
  const userModal = document.querySelector('[data-user-modal]');
  const userModalCloseBtn = document.querySelector('[data-user-modal-close]');
  const userModalCloseOverlay = document.querySelector('[data-user-modal-overlay]');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterBtn = document.getElementById('show-register');
  const showLoginBtn = document.getElementById('show-login');

  // user modal function
  const userModalCloseFunc = function () {
    if (userModal) userModal.classList.add('closed');
  }

  const userModalOpenFunc = function () {
    if (userModal) userModal.classList.remove('closed');
  }

  // user modal eventListener
  if (userModalCloseOverlay) userModalCloseOverlay.addEventListener('click', userModalCloseFunc);
  if (userModalCloseBtn) userModalCloseBtn.addEventListener('click', userModalCloseFunc);

  // toggle login/register forms
  if (showRegisterBtn) {
    showRegisterBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (loginForm) loginForm.classList.add('hidden');
      if (registerForm) registerForm.classList.remove('hidden');
    });
  }

  if (showLoginBtn) {
    showLoginBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (registerForm) registerForm.classList.add('hidden');
      if (loginForm) loginForm.classList.remove('hidden');
    });
  }

  // prevent the demo forms from reloading the page
  const userForms = document.querySelectorAll('[data-user-modal] form');
  userForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  });

  // cart modal variables
  const cartModal = document.querySelector('[data-cart-modal]');
  const cartModalCloseBtn = document.querySelector('[data-cart-modal-close]');
  const cartModalCloseOverlay = document.querySelector('[data-cart-modal-overlay]');

  // cart modal function
  const cartModalCloseFunc = function () {
    if (cartModal) cartModal.classList.add('closed');

    const clearConfirm = document.querySelector('[data-cart-clear-confirm]');
    if (clearConfirm) clearConfirm.classList.add('hidden');
  }

  // cart modal eventListener
  if (cartModalCloseOverlay) cartModalCloseOverlay.addEventListener('click', cartModalCloseFunc);
  if (cartModalCloseBtn) cartModalCloseBtn.addEventListener('click', cartModalCloseFunc);

  // cart modal open function
  const cartModalOpenFunc = function () {
    if (cartModal) {
      cartModal.classList.remove('closed');
      renderCart();
    }
  }

  // favorites modal variables
  const favoritesModal = document.querySelector('[data-favorites-modal]');
  const favoritesModalCloseBtn = document.querySelector('[data-favorites-modal-close]');
  const favoritesModalCloseOverlay = document.querySelector('[data-favorites-modal-overlay]');

  // favorites modal function
  const favoritesModalCloseFunc = function () {
    if (favoritesModal) favoritesModal.classList.add('closed');
  }

  // favorites modal eventListener
  if (favoritesModalCloseOverlay) favoritesModalCloseOverlay.addEventListener('click', favoritesModalCloseFunc);
  if (favoritesModalCloseBtn) favoritesModalCloseBtn.addEventListener('click', favoritesModalCloseFunc);

  // favorites modal open function
  const favoritesModalOpenFunc = function () {
    if (favoritesModal) {
      favoritesModal.classList.remove('closed');
      renderFavorites();
    }
  }

  // product modal variables
  const productModal = document.querySelector('[data-product-modal]');
  const productModalCloseBtn = document.querySelector('[data-product-modal-close]');
  const productModalCloseOverlay = document.querySelector('[data-product-modal-overlay]');

  // product modal function
  const productModalCloseFunc = function () {
    if (productModal) productModal.classList.add('closed');
  }

  // product modal eventListener
  if (productModalCloseOverlay) productModalCloseOverlay.addEventListener('click', productModalCloseFunc);
  if (productModalCloseBtn) productModalCloseBtn.addEventListener('click', productModalCloseFunc);

  // info modal variables
  const infoModal = document.querySelector('[data-info-modal]');
  const infoModalCloseBtn = document.querySelector('[data-info-modal-close]');
  const infoModalCloseOverlay = document.querySelector('[data-info-modal-overlay]');
  const infoModalTitle = document.getElementById('info-modal-title');
  const infoModalText = document.getElementById('info-modal-text');

  // info modal function
  const infoModalCloseFunc = function () {
    if (infoModal) infoModal.classList.add('closed');
  }

  const infoModalOpenFunc = function (title, content, titleKey, contentKey) {
    if (infoModal && infoModalTitle && infoModalText) {
      if (titleKey) infoModalTitle.setAttribute('data-i18n', titleKey);
      if (contentKey) infoModalText.setAttribute('data-i18n', contentKey);
      infoModalTitle.textContent = title;
      infoModalText.innerHTML = content;
      infoModal.classList.remove('closed');
    }
  }

  // info modal eventListener
  if (infoModalCloseOverlay) infoModalCloseOverlay.addEventListener('click', infoModalCloseFunc);
  if (infoModalCloseBtn) infoModalCloseBtn.addEventListener('click', infoModalCloseFunc);

  // product modal open function
  const productModalOpenFunc = function () {
    if (productModal) productModal.classList.remove('closed');
  }

  // notification toast variables
  const notificationToast = document.querySelector('[data-toast]');
  const toastCloseBtn = document.querySelector('[data-toast-close]');

  // notification toast eventListener
  if (toastCloseBtn && notificationToast) {
    toastCloseBtn.addEventListener('click', function () {
      notificationToast.classList.add('closed');
    });
  }

  // Show initial toast after page load (delayed)
  setTimeout(showRandomProductToast, 5000);

  // Close all modals and mobile menus with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      modalCloseFunc();
      userModalCloseFunc();
      cartModalCloseFunc();
      favoritesModalCloseFunc();
      productModalCloseFunc();
      infoModalCloseFunc();
      if (typeof notificationToast !== 'undefined' && notificationToast) {
        notificationToast.classList.add('closed');
      }

      // Close mobile menus if open
      if (typeof mobileMenu !== 'undefined') {
        for (let i = 0; i < mobileMenu.length; i++) {
          if (mobileMenu[i].classList.contains('active')) {
            mobileMenu[i].classList.remove('active');
            if (overlay) overlay.classList.remove('active');
          }
        }
      }
    }
  });

  // mobile menu variables
  const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
  const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
  const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
  const overlay = document.querySelector('[data-overlay]');

  for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

    // mobile menu function
    const mobileMenuCloseFunc = function () {
      mobileMenu[i].classList.remove('active');
      if (overlay) overlay.classList.remove('active');
    }

    mobileMenuOpenBtn[i].addEventListener('click', function () {
      mobileMenu[i].classList.add('active');
      if (overlay) overlay.classList.add('active');
    });

    if (mobileMenuCloseBtn[i]) mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
    if (overlay) overlay.addEventListener('click', mobileMenuCloseFunc);

  }

  // accordion variables
  const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
  const accordion = document.querySelectorAll('[data-accordion]');

  for (let i = 0; i < accordionBtn.length; i++) {

    accordionBtn[i].addEventListener('click', function () {

      const clickedBtn = this.nextElementSibling.classList.contains('active');

      for (let i = 0; i < accordion.length; i++) {

        if (clickedBtn) break;

        if (accordion[i].classList.contains('active')) {

          accordion[i].classList.remove('active');
          accordionBtn[i].classList.remove('active');

        }

      }

      this.nextElementSibling.classList.toggle('active');
      this.classList.toggle('active');

    });

  }



  // shopping cart and favorites functionality
  const headerHeartBtn = document.querySelector('.header-user-actions .action-btn:has(ion-icon[name="heart-outline"])') ||
    document.querySelector('.header-user-actions .action-btn ion-icon[name="heart-outline"]').parentElement;
  const headerHeartCount = headerHeartBtn ? headerHeartBtn.querySelector('.count') : null;

  const headerBagBtn = document.querySelector('.header-user-actions .action-btn:has(ion-icon[name="bag-handle-outline"])') ||
    document.querySelector('.header-user-actions .action-btn ion-icon[name="bag-handle-outline"]').parentElement;
  const headerBagCount = headerBagBtn ? headerBagBtn.querySelector('.count') : null;

  // mobile cart buttons
  const mobileBagBtns = document.querySelectorAll('.mobile-bottom-navigation .action-btn');
  const mobileBagCounts = document.querySelectorAll('.mobile-bottom-navigation .count');

  // cart data structure
  let cart = JSON.parse(localStorage.getItem('shopping-cart')) || [];
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartContentEl = document.querySelector('.cart-content');

  // coupon and shipping configuration
  const COUPONS = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME15: 15
  };
  const FREE_SHIPPING_THRESHOLD = 55;
  const SHIPPING_FEE = 4.99;
  let cartCoupon = localStorage.getItem('shopping-cart-coupon') || null;
  if (cartCoupon && !COUPONS[cartCoupon]) {
    cartCoupon = null;
    localStorage.removeItem('shopping-cart-coupon');
  }

  // favorites data structure
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesItemsContainer = document.querySelector('.favorites-items');
  const favoritesContentEl = document.querySelector('.favorites-content');

  // keep stored cart and favorites prices in sync with the current product prices
  function syncStoredPrices() {
    const normalizeImage = (src) => String(src || '')
      .replace(/^https?:\/\/[^/]+/, '')
      .replace(/^\.?\//, '');

    const cards = [...document.querySelectorAll('.showcase')].map((card) => {
      const title = card.querySelector('.showcase-title')?.textContent.trim();
      const price = card.querySelector('.price')?.textContent.trim();
      const oldPriceElement = card.querySelector('.price-box del');
      const oldPrice = oldPriceElement && !oldPriceElement.hidden
        ? oldPriceElement.textContent.trim()
        : '';
      const image = card.querySelector('.product-img, .showcase-img')?.getAttribute('src') || '';
      if (!title || !price) return null;

      return {
        id: title.toLowerCase().replace(/\s+/g, '-'),
        price: price,
        oldPrice: oldPrice,
        image: normalizeImage(image)
      };
    }).filter(Boolean);

    const findCurrentPrice = (item) => {
      let matches = cards.filter((card) => card.id === item.id);
      if (matches.length === 0) return null;
      if (matches.length === 1) return matches[0].price;

      const itemImage = normalizeImage(item.image);
      if (itemImage) {
        const imageMatches = matches.filter((card) => card.image === itemImage);
        if (imageMatches.length) matches = imageMatches;
      }

      if (item.oldPrice) {
        const oldPriceMatches = matches.filter((card) => card.oldPrice === item.oldPrice);
        if (oldPriceMatches.length) matches = oldPriceMatches;
      }

      const prices = [...new Set(matches.map((card) => card.price))];
      return prices.length === 1 ? prices[0] : null;
    };

    const syncList = (list) => list.map((item) => {
      const currentPrice = findCurrentPrice(item);
      return currentPrice ? { ...item, price: currentPrice } : item;
    });

    cart = syncList(cart);
    favorites = syncList(favorites);
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // cart helpers
  function getTranslation(key, fallback) {
    const lang = localStorage.getItem('language') || 'en-US';
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return fallback;
  }

  function formatPrice(value) {
    return '$' + value.toFixed(2);
  }

  function parseItemPrice(price) {
    const priceString = String(price).replace(/[^0-9.]/g, '');
    const parsed = parseFloat(priceString);
    return isNaN(parsed) ? 0 : parsed;
  }

  function getCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + parseItemPrice(item.price) * item.quantity, 0);
    const discountPercent = cartCoupon && COUPONS[cartCoupon] ? COUPONS[cartCoupon] : 0;
    const discount = subtotal * discountPercent / 100;
    const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;

    return {
      subtotal: subtotal,
      discount: discount,
      discountPercent: discountPercent,
      shipping: shipping,
      total: Math.max(0, subtotal - discount + shipping)
    };
  }

  function applyCartTranslations() {
    const lang = localStorage.getItem('language') || 'en-US';
    if (typeof updateLanguage === 'function') updateLanguage(lang);
  }

  // cart functions
  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    cartModalOpenFunc();
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      localStorage.setItem('shopping-cart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
    }
  }

  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (headerBagCount) {
      headerBagCount.textContent = totalItems;
    }
    // Update mobile counts if they exist
    mobileBagCounts.forEach(count => {
      // Check if this count belongs to a bag button
      const parent = count.parentElement;
      const icon = parent.querySelector('ion-icon[name="bag-handle-outline"]');
      if (icon) count.textContent = totalItems;
    });
  }

  function renderCart() {
    if (!cartItemsContainer) return;

    const totals = getCartTotals();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const countEl = document.querySelector('[data-cart-count]');
    const subtotalEl = document.querySelector('[data-cart-subtotal]');
    const shippingEl = document.querySelector('[data-cart-shipping]');
    const discountRow = document.querySelector('[data-cart-discount-row]');
    const discountEl = document.querySelector('[data-cart-discount]');
    const totalEl = document.querySelector('[data-cart-total]');
    const couponInput = document.querySelector('[data-cart-coupon-input]');
    const couponMessage = document.querySelector('[data-cart-coupon-message]');
    const shippingText = document.querySelector('[data-cart-shipping-text]');
    const shippingProgress = document.querySelector('[data-cart-shipping-progress]');
    const shippingBox = document.querySelector('[data-cart-shipping-box]');

    if (countEl) countEl.textContent = itemCount;
    if (cartContentEl) cartContentEl.classList.toggle('is-empty', cart.length === 0);

    if (cart.length === 0) {
      if (cartCoupon) {
        cartCoupon = null;
        localStorage.removeItem('shopping-cart-coupon');
      }

      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <ion-icon name="bag-handle-outline"></ion-icon>
          <h3 data-i18n="cart_empty">Your cart is empty</h3>
          <p data-i18n="cart_empty_desc">Looks like you haven't added anything yet.</p>
          <button type="button" class="cart-empty-btn" data-cart-continue>
            <ion-icon name="arrow-back-outline"></ion-icon>
            <span data-i18n="continue_shopping">Continue shopping</span>
          </button>
        </div>
      `;

      if (subtotalEl) subtotalEl.textContent = formatPrice(0);
      if (shippingEl) {
        shippingEl.textContent = '\u2014';
        shippingEl.classList.remove('is-free');
      }
      if (discountRow) discountRow.classList.add('hidden');
      if (totalEl) totalEl.textContent = formatPrice(0);
      if (couponInput) couponInput.value = '';
      if (couponMessage) {
        couponMessage.textContent = '';
        couponMessage.className = 'cart-coupon-message';
      }

      applyCartTranslations();
      return;
    }

    let cartHTML = '';

    cart.forEach(item => {
      const unitPrice = parseItemPrice(item.price);
      const itemTotal = unitPrice * item.quantity;

      cartHTML += `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <p class="cart-item-price">
              ${formatPrice(itemTotal)}
              ${item.quantity > 1 ? `<span class="cart-item-unit-price">(${formatPrice(unitPrice)} ${getTranslation('each', 'each')})</span>` : ''}
            </p>
            <div class="cart-item-quantity">
              <button type="button" class="quantity-btn minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>
              <span class="quantity">${item.quantity}</span>
              <button type="button" class="quantity-btn plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button type="button" class="cart-item-remove" data-id="${item.id}" aria-label="${getTranslation('remove', 'Remove')}">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = cartHTML;

    if (subtotalEl) subtotalEl.textContent = formatPrice(totals.subtotal);

    if (shippingEl) {
      if (totals.shipping === 0) {
        shippingEl.textContent = getTranslation('free', 'Free');
        shippingEl.classList.add('is-free');
      } else {
        shippingEl.textContent = formatPrice(totals.shipping);
        shippingEl.classList.remove('is-free');
      }
    }

    if (discountRow && discountEl) {
      if (totals.discount > 0) {
        discountRow.classList.remove('hidden');
        discountEl.textContent = '-' + formatPrice(totals.discount);
      } else {
        discountRow.classList.add('hidden');
      }
    }

    if (totalEl) totalEl.textContent = formatPrice(totals.total);
    if (couponInput && cartCoupon) couponInput.value = cartCoupon;

    if (couponMessage) {
      couponMessage.className = 'cart-coupon-message';

      if (cartCoupon) {
        couponMessage.classList.add('success');
        couponMessage.innerHTML = `${getTranslation('coupon_applied', 'Coupon applied')} (${cartCoupon} -${totals.discountPercent}%).
          <button type="button" class="cart-coupon-remove" data-cart-coupon-remove>${getTranslation('remove', 'Remove')}</button>`;
      } else {
        couponMessage.textContent = '';
      }
    }

    // free shipping progress
    if (shippingBox && shippingText && shippingProgress) {
      shippingBox.classList.remove('hidden');

      if (totals.subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingText.classList.add('is-complete');
        shippingText.innerHTML = `<ion-icon name="checkmark-circle-outline"></ion-icon> ${getTranslation('free_shipping_unlocked', 'You have unlocked free shipping!')}`;
        shippingProgress.style.width = '100%';
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - totals.subtotal;
        const progress = Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100);
        shippingText.classList.remove('is-complete');
        shippingText.innerHTML = getTranslation('free_shipping_progress', 'Add {amount} more for free shipping')
          .replace('{amount}', `<strong>${formatPrice(remaining)}</strong>`);
        shippingProgress.style.width = progress + '%';
      }
    }

    // add event listeners for quantity buttons and remove buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const item = cart.find(item => item.id === id);
        if (item) {
          updateQuantity(id, item.quantity - 1);
        }
      });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const item = cart.find(item => item.id === id);
        if (item) {
          updateQuantity(id, item.quantity + 1);
        }
      });
    });

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        removeFromCart(id);
      });
    });

    applyCartTranslations();
  }

  // cart modal options
  const cartClearBtn = document.querySelector('[data-cart-clear]');
  const cartClearConfirm = document.querySelector('[data-cart-clear-confirm]');
  const cartClearCancelBtn = document.querySelector('[data-cart-clear-cancel]');
  const cartClearAcceptBtn = document.querySelector('[data-cart-clear-accept]');
  const cartCheckoutBtn = document.querySelector('.cart-summary [data-checkout-btn]');
  const cartCouponApplyBtn = document.querySelector('[data-cart-coupon-apply]');
  const cartCouponInputEl = document.querySelector('[data-cart-coupon-input]');

  function closeCartClearConfirm() {
    if (cartClearConfirm) cartClearConfirm.classList.add('hidden');
  }

  if (cartClearBtn) {
    cartClearBtn.addEventListener('click', function () {
      if (cart.length === 0 || !cartClearConfirm) return;

      cartClearConfirm.classList.remove('hidden');
      if (cartClearCancelBtn) cartClearCancelBtn.focus();
    });
  }

  if (cartClearCancelBtn) {
    cartClearCancelBtn.addEventListener('click', closeCartClearConfirm);
  }

  if (cartClearAcceptBtn) {
    cartClearAcceptBtn.addEventListener('click', function () {
      closeCartClearConfirm();

      cart = [];
      cartCoupon = null;
      localStorage.removeItem('shopping-cart');
      localStorage.removeItem('shopping-cart-coupon');
      updateCartCount();
      renderCart();
    });
  }

  if (cartClearConfirm) {
    cartClearConfirm.addEventListener('click', function (event) {
      if (event.target === cartClearConfirm) {
        closeCartClearConfirm();
      }
    });
  }

  // keep the cart modal open when Escape closes the confirmation
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && cartClearConfirm && !cartClearConfirm.classList.contains('hidden')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeCartClearConfirm();
    }
  }, true);

  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', function () {
      window.location.href = 'checkout.html';
    });
  }

  function applyCouponCode() {
    if (!cartCouponInputEl) return;

    const code = cartCouponInputEl.value.trim().toUpperCase();
    const couponMessage = document.querySelector('[data-cart-coupon-message]');

    if (!code) {
      cartCoupon = null;
      localStorage.removeItem('shopping-cart-coupon');
      renderCart();

      if (couponMessage) {
        couponMessage.textContent = getTranslation('coupon_hint', 'Try SAVE10 or SAVE20.');
        couponMessage.className = 'cart-coupon-message error';
      }
      return;
    }

    if (COUPONS[code]) {
      cartCoupon = code;
      localStorage.setItem('shopping-cart-coupon', code);
      renderCart();
    } else {
      cartCoupon = null;
      localStorage.removeItem('shopping-cart-coupon');
      renderCart();

      if (couponMessage) {
        couponMessage.textContent = `${getTranslation('coupon_invalid', 'Invalid coupon code.')} ${getTranslation('coupon_hint', 'Try SAVE10 or SAVE20.')}`;
        couponMessage.className = 'cart-coupon-message error';
      }

      cartCouponInputEl.value = code;
    }
  }

  if (cartCouponApplyBtn) {
    cartCouponApplyBtn.addEventListener('click', applyCouponCode);
  }

  if (cartCouponInputEl) {
    cartCouponInputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyCouponCode();
      }
    });
  }

  if (cartContentEl) {
    cartContentEl.addEventListener('click', function (event) {
      const continueBtn = event.target.closest('[data-cart-continue]');
      if (continueBtn) {
        event.preventDefault();
        cartModalCloseFunc();
        return;
      }

      const removeCouponBtn = event.target.closest('[data-cart-coupon-remove]');
      if (removeCouponBtn) {
        event.preventDefault();
        cartCoupon = null;
        localStorage.removeItem('shopping-cart-coupon');
        renderCart();
      }
    });
  }

  // favorites functions
  function addToFavorites(product) {
    if (!favorites.find(item => item.id === product.id)) {
      favorites.push(product);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      updateFavoritesCount();
      renderFavorites();
    }
  }

  function removeFromFavorites(productId) {
    favorites = favorites.filter(item => item.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
    renderFavorites();
  }

  function updateFavoritesCount() {
    if (headerHeartCount) {
      headerHeartCount.textContent = favorites.length;
    }
    // Update mobile heart count
    const mobileHeartCounts = document.querySelectorAll('.mobile-bottom-navigation .count');
    mobileHeartCounts.forEach(count => {
      const parent = count.parentElement;
      const icon = parent.querySelector('ion-icon[name="heart-outline"]');
      if (icon) count.textContent = favorites.length;
    });
  }

  function renderFavorites() {
    if (!favoritesItemsContainer) return;

    const lang = localStorage.getItem('language') || 'en-US';
    const subtitleEl = document.querySelector('[data-favorites-subtitle]');

    if (subtitleEl) {
      const label = favorites.length === 1
        ? getTranslation('saved_item', 'saved item')
        : getTranslation('saved_items', 'saved items');
      subtitleEl.textContent = `${favorites.length} ${label}`;
    }

    if (favorites.length === 0) {
      favoritesItemsContainer.innerHTML = `
        <div class="favorites-empty">
          <ion-icon name="heart-outline"></ion-icon>
          <h3 data-i18n="favorites_empty">No favorites yet.</h3>
          <p data-i18n="favorites_empty_desc">Tap the heart on any product to save it here.</p>
          <button type="button" class="favorites-empty-btn" data-favorites-continue>
            <ion-icon name="grid-outline"></ion-icon>
            <span data-i18n="explore_products">Explore products</span>
          </button>
        </div>
      `;

      if (typeof updateLanguage === 'function') updateLanguage(lang);
      return;
    }

    let favoritesHTML = '';

    favorites.forEach(item => {
      favoritesHTML += `
        <div class="favorites-item" data-id="${item.id}">
          <div class="favorites-item-media">
            <img src="${item.image}" alt="${item.title}" class="favorites-item-img">
          </div>
          <div class="favorites-item-details">
            <h4 class="favorites-item-title">${item.title}</h4>
            <p class="favorites-item-price">${item.price}</p>
            <div class="favorites-item-actions">
              <button type="button" class="favorites-add-cart" data-id="${item.id}">
                <ion-icon name="bag-add-outline"></ion-icon>
                <span data-i18n="add_to_cart">Add to Cart</span>
              </button>
              <button type="button" class="favorites-item-heart" data-id="${item.id}" aria-label="${getTranslation('remove', 'Remove')}">
                <ion-icon name="heart"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    favoritesItemsContainer.innerHTML = favoritesHTML;

    if (typeof updateLanguage === 'function') updateLanguage(lang);

    // add item to cart from favorites
    document.querySelectorAll('.favorites-add-cart').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const item = favorites.find(favorite => favorite.id === id);
        if (item) {
          favoritesModalCloseFunc();
          addToCart(item);
        }
      });
    });

    // add event listeners for heart buttons
    document.querySelectorAll('.favorites-item-heart').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        removeFromFavorites(id);
        // also update the heart icon on the product
        updateProductHeartIcon(id, false);
      });
    });
  }

  if (favoritesContentEl) {
    favoritesContentEl.addEventListener('click', function (event) {
      if (event.target.closest('[data-favorites-continue]')) {
        event.preventDefault();
        favoritesModalCloseFunc();
      }
    });
  }

  function updateProductHeartIcon(productId, isFavorited) {
    // find the product showcase and update the heart icon
    const showcases = document.querySelectorAll('.showcase');
    showcases.forEach(showcase => {
      const titleElement = showcase.querySelector('.showcase-title');
      if (!titleElement) return;

      const title = titleElement.textContent;
      const id = title.toLowerCase().replace(/\s+/g, '-');
      if (id === productId) {
        const actionBtns = showcase.querySelectorAll('.showcase-actions .btn-action');
        actionBtns.forEach(btn => {
          const icon = btn.querySelector('ion-icon');
          if (icon && (icon.name === 'heart' || icon.name === 'heart-outline')) {
            icon.name = isFavorited ? 'heart' : 'heart-outline';
          }
        });
      }
    });
  }

  let currentProduct = null;

  function renderProductModal(product) {
    if (!productModal) return;
    currentProduct = product;

    const modalImg = productModal.querySelector('.product-modal-img');
    const modalTitle = productModal.querySelector('.product-modal-title');
    const modalPrice = productModal.querySelector('.product-modal-price');
    const modalDel = productModal.querySelector('.product-modal-del');

    if (modalImg) {
      modalImg.src = product.image;
      modalImg.alt = product.alt;
    }
    if (modalTitle) modalTitle.textContent = product.title;
    if (modalPrice) modalPrice.textContent = product.price;
    if (modalDel) {
      modalDel.textContent = product.oldPrice || '';
      modalDel.hidden = !product.oldPrice;
    }

    // Update heart icon state
    const heartBtn = productModal.querySelector('[data-product-modal-favorite] ion-icon');
    if (heartBtn) {
      const isFavorited = favorites.some(item => item.id === product.id);
      const iconName = heartBtn ? heartBtn.getAttribute('name') : null;
      if (heartBtn && (iconName === 'heart' || iconName === 'heart-outline')) {
        heartBtn.setAttribute('name', isFavorited ? 'heart' : 'heart-outline');
      }
    }

    productModalOpenFunc();
  }

  // Product modal actions
  const productModalAddCartBtn = document.querySelector('[data-product-modal-add-cart]');
  if (productModalAddCartBtn) {
    productModalAddCartBtn.addEventListener('click', function () {
      if (currentProduct) {
        addToCart(currentProduct);
        productModalCloseFunc();
      }
    });
  }

  const productModalFavoriteBtn = document.querySelector('[data-product-modal-favorite]');
  if (productModalFavoriteBtn) {
    productModalFavoriteBtn.addEventListener('click', function () {
      if (currentProduct) {
        const icon = this.querySelector('ion-icon');
        const isCurrentlyFavorited = favorites.some(item => item.id === currentProduct.id);

        if (isCurrentlyFavorited) {
          removeFromFavorites(currentProduct.id);
          if (icon) icon.setAttribute('name', 'heart-outline');
        } else {
          addToFavorites(currentProduct);
          if (icon) icon.setAttribute('name', 'heart');
        }
      }
    });
  }

  // product eye buttons
  const productEyeBtns = document.querySelectorAll('.showcase-actions .btn-action');
  productEyeBtns.forEach(btn => {
    const icon = btn.querySelector('ion-icon');
    const iconName = icon ? icon.getAttribute('name') : null;
    if (icon && (iconName === 'eye-outline' || iconName === 'eye')) {
      btn.addEventListener('click', function () {
        const showcase = this.closest('.showcase');
        if (showcase) {
          const product = extractProductData(showcase);
          if (product) renderProductModal(product);
        }
      });
    }
  });

  // Add click handlers to showcase images and titles to open product modal
  const showcaseImgBoxes = document.querySelectorAll('.showcase-img-box');
  const showcaseBannerImages = document.querySelectorAll('.showcase-banner .product-img');
  const showcaseTitleLinks = document.querySelectorAll('.showcase-content > a, .showcase-content h3 > a, .showcase-title');

  showcaseImgBoxes.forEach(box => {
    box.addEventListener('click', function (e) {
      e.preventDefault();
      const showcase = this.closest('.showcase');
      if (showcase) {
        const product = extractProductData(showcase);
        if (product) renderProductModal(product);
      }
    });
  });

  showcaseBannerImages.forEach(img => {
    img.addEventListener('click', function (e) {
      e.preventDefault();
      const showcase = this.closest('.showcase');
      if (showcase) {
        const product = extractProductData(showcase);
        if (product) renderProductModal(product);
      }
    });
  });

  showcaseTitleLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const showcase = this.closest('.showcase');
      if (showcase) {
        const product = extractProductData(showcase);
        if (product) renderProductModal(product);
      }
    });
  });

  // product favorite buttons
  const productHeartBtns = document.querySelectorAll('.showcase-actions .btn-action');
  productHeartBtns.forEach(btn => {
    const icon = btn.querySelector('ion-icon');
    const iconName = icon ? icon.getAttribute('name') : null;
    if (icon && (iconName === 'heart-outline' || iconName === 'heart')) {
      btn.addEventListener('click', function () {
        const showcase = this.closest('.showcase');
        if (showcase) {
          const product = extractProductData(showcase);
          if (product) {
            const isCurrentlyFavorited = favorites.some(item => item.id === product.id);

            if (isCurrentlyFavorited) {
              removeFromFavorites(product.id);
              icon.setAttribute('name', 'heart-outline');
            } else {
              addToFavorites(product);
              icon.setAttribute('name', 'heart');
            }
          }
        }
      });
    }
  });

  // product cart buttons
  const productCartBtns = document.querySelectorAll('.showcase-actions .btn-action');
  productCartBtns.forEach(btn => {
    const icon = btn.querySelector('ion-icon');
    const iconName = icon ? icon.getAttribute('name') : null;
    if (icon && iconName === 'bag-add-outline') {
      btn.addEventListener('click', function () {
        const showcase = this.closest('.showcase');
        if (showcase) {
          const product = extractProductData(showcase);
          if (product) addToCart(product);
        }
      });
    }
  });

  // add to cart buttons
  const addCartBtns = document.querySelectorAll('.add-cart-btn');
  addCartBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const showcase = this.closest('.showcase');
      if (showcase) {
        const product = extractProductData(showcase);
        if (product) addToCart(product);
      }
    });
  });

  // function to extract product data from showcase element
  function extractProductData(showcase) {
    const img = showcase.querySelector('.product-img') || showcase.querySelector('.showcase-img');
    const titleElement = showcase.querySelector('.showcase-title');
    const priceElement = showcase.querySelector('.price');

    if (!img || !titleElement || !priceElement) {
      console.error('Missing product data elements', { img, titleElement, priceElement, showcase });
      return null;
    }

    const title = titleElement.textContent.trim();
    const price = priceElement.textContent;
    const oldPriceElement = showcase.querySelector('.price-box del');
    const oldPrice = oldPriceElement && !oldPriceElement.hidden
      ? oldPriceElement.textContent.trim()
      : '';
    const id = title.toLowerCase().replace(/\s+/g, '-'); // simple id generation

    return {
      id: id,
      title: title,
      price: price,
      oldPrice: oldPrice,
      image: img.src,
      alt: img.alt
    };
  }

  // open modals on header button clicks
  const headerActionBtns = document.querySelectorAll('.header-user-actions .action-btn');
  if (headerActionBtns.length >= 3) {
    // Assuming order: person, heart, bag
    headerActionBtns[0].addEventListener('click', userModalOpenFunc); // person
    headerActionBtns[1].addEventListener('click', favoritesModalOpenFunc); // heart
    headerActionBtns[2].addEventListener('click', cartModalOpenFunc); // bag
  }

  // open user modal on mobile user button click
  const mobileUserBtn = document.querySelector('[data-mobile-user-btn]');
  if (mobileUserBtn) {
    mobileUserBtn.addEventListener('click', userModalOpenFunc);
  }

  // open cart modal on mobile bag button clicks
  mobileBagBtns.forEach(btn => {
    const icon = btn.querySelector('ion-icon[name="bag-handle-outline"]');
    if (icon) {
      btn.addEventListener('click', cartModalOpenFunc);
    }
  });

  // open favorites modal on mobile heart button clicks
  const mobileHeartBtns = document.querySelectorAll('.mobile-bottom-navigation .action-btn');
  mobileHeartBtns.forEach(btn => {
    const icon = btn.querySelector('ion-icon[name="heart-outline"]');
    if (icon) {
      btn.addEventListener('click', favoritesModalOpenFunc);
    }
  });

  // scroll to top on mobile home button clicks
  const mobileHomeBtns = document.querySelectorAll('.mobile-bottom-navigation .action-btn');
  mobileHomeBtns.forEach(btn => {
    const icon = btn.querySelector('ion-icon[name="home-outline"]');
    if (icon) {
      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });

  // Search functionality
  const searchField = document.querySelector('.search-field');
  const searchBtn = document.querySelector('.search-btn');

  function handleSearch() {
    const query = searchField.value.toLowerCase().trim();
    const showcases = document.querySelectorAll('.showcase');

    showcases.forEach(showcase => {
      const titleElement = showcase.querySelector('.showcase-title');
      if (titleElement) {
        const title = titleElement.textContent.toLowerCase();
        if (title.includes(query)) {
          showcase.classList.remove('hidden');
        } else {
          showcase.classList.add('hidden');
        }
      }
    });
  }

  if (searchBtn && searchField) {
    searchBtn.addEventListener('click', handleSearch);
    searchField.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
    // Optional: Real-time search
    searchField.addEventListener('input', handleSearch);
  }

  // Category "Show all" button functionality
  const categoryBtns = document.querySelectorAll('.category-btn');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const category = this.getAttribute('data-category');
      if (!category) return;

      // Scroll to products section
      const productContainer = document.querySelector('.product-container');
      if (productContainer) {
        productContainer.scrollIntoView({ behavior: 'smooth' });
      }

      // Filter products by category
      filterProductsByCategory(category);
    });
  });

  function filterProductsByCategory(category) {
    const showcases = document.querySelectorAll('.showcase');
    const categoryLower = category.toLowerCase();

    // First, show all showcases
    showcases.forEach(showcase => {
      showcase.classList.remove('hidden');
      showcase.classList.remove('dimmed');
    });

    // Then hide non-matching products (show only matching category)
    showcases.forEach(showcase => {
      const categoryElement = showcase.querySelector('.showcase-category');
      let shouldShow = false;

      if (categoryElement) {
        const productCategory = categoryElement.textContent.toLowerCase();
        // Check for various matching patterns
        shouldShow =
          productCategory === categoryLower ||
          productCategory.includes(categoryLower) ||
          categoryLower.includes(productCategory) ||
          // Handle special cases
          (categoryLower === 'winter-wear' && (productCategory.includes('winter') || productCategory.includes('jacket'))) ||
          (categoryLower === 't-shirts' && (productCategory.includes('t-shirt') || productCategory.includes('clothes'))) ||
          (categoryLower === 'dress' && (productCategory.includes('dress') || productCategory.includes('clothes') || productCategory.includes('frock'))) ||
          (categoryLower === 'hat' && (productCategory.includes('hat') || productCategory.includes('cap')));
      } else {
        // For showcases without category element, try to match by title
        const titleElement = showcase.querySelector('.showcase-title');
        if (titleElement) {
          const title = titleElement.textContent.toLowerCase();
          shouldShow = title.includes(categoryLower) || categoryLower.includes(title.split(' ')[0]);
        }
      }

      if (!shouldShow) {
        showcase.classList.add('hidden');
      }
    });

    // Store current filter for toast notifications
    window.currentCategoryFilter = category;
  }

  function filterByStatus(status) {
    const showcases = document.querySelectorAll('.showcase');
    const statusLower = status.toLowerCase();

    showcases.forEach(showcase => {
      showcase.classList.remove('hidden');
      showcase.classList.remove('dimmed');
    });

    showcases.forEach(showcase => {
      let shouldShow = false;
      const badge = showcase.querySelector('.showcase-badge');
      const delPrice = showcase.querySelector('del');

      if (statusLower === 'prices_drop') {
        shouldShow = badge && (badge.textContent.toLowerCase().includes('sale') || badge.textContent.toLowerCase().includes('off')) || delPrice;
      } else if (statusLower === 'new_products') {
        shouldShow = badge && badge.textContent.toLowerCase().includes('new');
      } else if (statusLower === 'best_sales') {
        // Just show items with 4+ stars or specifically "trending" (using badges for now)
        shouldShow = badge && (badge.textContent.toLowerCase().includes('hot') || badge.textContent.toLowerCase().includes('trend')) || (showcase.querySelectorAll('.showcase-rating ion-icon[name="star"]').length >= 4);
      }

      if (!shouldShow) {
        showcase.classList.add('hidden');
      }
    });

    scrollToProducts();
  }

  function clearCategoryFilter() {
    const showcases = document.querySelectorAll('.showcase');
    showcases.forEach(showcase => {
      showcase.classList.remove('hidden');
      showcase.classList.remove('dimmed');
    });
    window.currentCategoryFilter = null;
  }

  // Toast notification functionality
  function getAllProducts() {
    const products = [];
    const showcases = document.querySelectorAll('.showcase');

    showcases.forEach(showcase => {
      // Only include visible products (not hidden by search or dimmed by category filter)
      if (!showcase.classList.contains('hidden') && !showcase.classList.contains('dimmed')) {
        const img = showcase.querySelector('.product-img') || showcase.querySelector('.showcase-img');
        const titleElement = showcase.querySelector('.showcase-title');

        if (img && titleElement) {
          products.push({
            title: titleElement.textContent,
            image: img.src,
            alt: img.alt
          });
        }
      }
    });

    return products;
  }

  function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // Check if element is within viewport bounds
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return vertInView && horInView;
  }

  function showRandomProductToast() {
    const products = getAllProducts();
    if (products.length === 0) return;

    const randomProduct = products[Math.floor(Math.random() * products.length)];

    // Update toast content
    const toastBanner = notificationToast.querySelector('.toast-banner img');
    const toastTitle = notificationToast.querySelector('.toast-title');

    if (toastBanner) {
      toastBanner.src = randomProduct.image;
      toastBanner.alt = randomProduct.alt;
    }
    if (toastTitle) {
      toastTitle.textContent = randomProduct.title;
    }

    // Show toast
    notificationToast.classList.remove('closed');

    // Auto-hide after 8 seconds (longer for mobile)
    setTimeout(() => {
      notificationToast.classList.add('closed');
    }, 8000);
  }

  // Show toast every 30 seconds
  setInterval(showRandomProductToast, 30000);

  // Footer and Sitemap navigation functionality (Using delegation for dynamic content)
  document.body.addEventListener('click', function (e) {
    const link = e.target.closest('.footer-nav-link');
    if (link) {
      e.preventDefault();
      const linkText = link.textContent.trim();
      const dataI18n = link.getAttribute('data-i18n');
      const lang = localStorage.getItem('language') || 'en-US';

      // Map i18n keys to categories or info modal content
      const infoContent = {
        'about_us': {
          title: translations[lang]['about_us'] || 'About Us',
          content: translations[lang]['about_us_content'] || ''
        },
        'our_company': {
          title: translations[lang]['our_company'] || 'Our Company',
          content: translations[lang]['our_company_content'] || ''
        },
        'contact_us': {
          title: translations[lang]['contact_us'] || 'Contact Us',
          content: translations[lang]['contact_us_content'] || ''
        },
        'delivery': {
          title: translations[lang]['delivery'] || 'Delivery Information',
          content: translations[lang]['delivery_content'] || ''
        },
        'legal_notice': {
          title: translations[lang]['legal_notice'] || 'Legal Notice',
          content: translations[lang]['legal_notice_content'] || ''
        },
        'terms_conditions': {
          title: translations[lang]['terms_conditions'] || 'Terms and Conditions',
          content: translations[lang]['terms_conditions_content'] || ''
        },
        'secure_payment': {
          title: translations[lang]['secure_payment'] || 'Secure Payment',
          content: translations[lang]['secure_payment_content'] || ''
        },
        'sitemap': {
          title: translations[lang]['sitemap'] || 'Sitemap',
          content: translations[lang]['sitemap_content'] || ''
        },
        'return_policy': {
          title: translations[lang]['return_policy'] || 'Return Policy',
          content: translations[lang]['return_policy_content'] || ''
        }
      };

      // Handle Home link
      if (dataI18n === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (infoModal) infoModal.classList.add('closed');
        return;
      }

      // Handle My Account link
      if (dataI18n === 'my_account') {
        if (infoModal) infoModal.classList.add('closed');
        userModalOpenFunc();
        return;
      }

      // Check if it's an info link
      if (dataI18n && infoContent[dataI18n]) {
        infoModalOpenFunc(
          infoContent[dataI18n].title,
          infoContent[dataI18n].content,
          dataI18n,
          dataI18n + '_content'
        );
        return;
      }

      // Check if it's a category filter
      const categoryKeys = {
        'fashion': 'fashion',
        'electronic': 'electronics',
        'cosmetics': 'cosmetics',
        'watch': 'watch',
        'health': 'health'
      };

      if (dataI18n && categoryKeys[dataI18n]) {
        filterProductsByCategory(categoryKeys[dataI18n]);
        scrollToProducts();
        if (infoModal) infoModal.classList.add('closed');
        return;
      }

      // Specialized product filters
      if (dataI18n === 'prices_drop') {
        filterByStatus('prices_drop');
        return;
      }
      if (dataI18n === 'new_products') {
        filterByStatus('new_products');
        return;
      }
      if (dataI18n === 'best_sales') {
        filterByStatus('best_sales');
        return;
      }

      // Fallback: If no data-i18n match, use text content
      const lowerText = linkText.toLowerCase();
      if (lowerText.includes('health')) {
        filterProductsByCategory('health');
        scrollToProducts();
      }
    }
  });

  // Christmas campaign: annual window from November 15 to January 5
  const christmasCampaign = window.ChristmasCampaign;
  const christmasPromo = document.querySelector('[data-christmas-promo]');
  const christmasHeroBadge = document.querySelector('.christmas-hero-badge');
  const christmasCta = document.querySelector('.christmas-cta');
  const christmasCountdown = document.querySelector('[data-christmas-countdown]');
  const christmasCountdownValue = document.querySelector('[data-christmas-countdown-value]');
  const christmasSalePrices = new Map();
  let christmasCountdownTimer = null;
  let christmasCampaignActive = null;

  // The HTML ships with the campaign prices applied; remember them before
  // reverting anything so the promotion can be reactivated without a reload.
  document.querySelectorAll('.price[data-christmas-base]').forEach((priceElement) => {
    christmasSalePrices.set(priceElement, priceElement.textContent.trim());
  });

  function setChristmasPrice(priceElement, active) {
    const base = Number.parseFloat(priceElement.dataset.christmasBase);
    if (!Number.isFinite(base)) return;

    const priceBox = priceElement.closest('.price-box');
    const oldPriceElement = priceBox ? priceBox.querySelector('del') : null;

    if (active) {
      const salePrice = christmasSalePrices.get(priceElement);
      if (salePrice) priceElement.textContent = salePrice;

      if (oldPriceElement) {
        oldPriceElement.textContent = formatPrice(base);
        oldPriceElement.hidden = false;
      }
      return;
    }

    priceElement.textContent = formatPrice(base);
    if (!oldPriceElement) return;

    if (oldPriceElement.dataset.christmasAdded === 'true') {
      oldPriceElement.hidden = true;
      return;
    }

    const originalOldPrice = oldPriceElement.dataset.christmasOriginalDel;
    if (originalOldPrice) {
      oldPriceElement.textContent = originalOldPrice;
    }
    oldPriceElement.hidden = false;
  }

  function startChristmasCountdown(endDate) {
    if (!christmasCountdown || !christmasCountdownValue || !endDate) return;
    if (christmasCountdownTimer) clearInterval(christmasCountdownTimer);

    const renderChristmasCountdown = () => {
      const remaining = endDate.getTime() - Date.now();

      if (remaining <= 0) {
        christmasCountdownValue.textContent = getTranslation('christmas_ended', 'Offer ended');
        if (christmasCountdownTimer) clearInterval(christmasCountdownTimer);
        christmasCountdownTimer = null;
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
    christmasCountdownTimer = setInterval(renderChristmasCountdown, 1000);
  }

  function refreshChristmasCampaign() {
    if (!christmasCampaign) return;

    const campaignWindow = christmasCampaign.getCampaignWindow();
    const isActive = campaignWindow.active;

    if (isActive === christmasCampaignActive) return;
    christmasCampaignActive = isActive;

    document.documentElement.setAttribute(
      'data-christmas-campaign',
      isActive ? 'on' : 'off'
    );

    [christmasPromo, christmasHeroBadge, christmasCta].forEach((element) => {
      if (element) element.hidden = !isActive;
    });

    document.querySelectorAll('.price[data-christmas-base]').forEach((priceElement) => {
      setChristmasPrice(priceElement, isActive);
    });

    // Keep saved carts and favorites aligned with the current season.
    syncStoredPrices();

    if (isActive) {
      startChristmasCountdown(campaignWindow.end);
      return;
    }

    if (christmasCountdownTimer) clearInterval(christmasCountdownTimer);
    christmasCountdownTimer = null;
  }

  if (christmasCampaign) {
    christmasCampaign.refresh = refreshChristmasCampaign;
    refreshChristmasCampaign();

    // If the page stays open across a season boundary, update it automatically.
    setInterval(() => {
      if (christmasCampaign.isActive() !== christmasCampaignActive) {
        refreshChristmasCampaign();
      }
    }, 60000);
  }

  // Initial UI update from localStorage
  syncStoredPrices();
  updateCartCount();
  renderCart();
  updateFavoritesCount();
  renderFavorites();

  function scrollToProducts() {
    const productContainer = document.querySelector('.product-container');
    if (productContainer) {
      productContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function showAllProducts() {
    const showcases = document.querySelectorAll('.showcase');
    showcases.forEach(showcase => {
      showcase.classList.remove('hidden');
      showcase.classList.remove('dimmed');
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#" or empty
      if (!href || href === '#') return;

      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Close mobile menu if open
        const mobileMenus = document.querySelectorAll('[data-mobile-menu]');
        const overlay = document.querySelector('[data-overlay]');
        mobileMenus.forEach(menu => menu.classList.remove('active'));
        if (overlay) overlay.classList.remove('active');

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

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