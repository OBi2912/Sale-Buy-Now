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

  // cart modal variables
  const cartModal = document.querySelector('[data-cart-modal]');
  const cartModalCloseBtn = document.querySelector('[data-cart-modal-close]');
  const cartModalCloseOverlay = document.querySelector('[data-cart-modal-overlay]');

  // cart modal function
  const cartModalCloseFunc = function () {
    if (cartModal) cartModal.classList.add('closed');
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

  // favorites data structure
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesItemsContainer = document.querySelector('.favorites-items');

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

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <ion-icon name="bag-handle-outline"></ion-icon>
          <h3 data-i18n="cart_empty">Your cart is empty</h3>
          <p data-i18n="add_products_start">Add some products to get started!</p>
        </div>
      `;
      const lang = localStorage.getItem('language') || 'en-US';
      if (typeof updateLanguage === 'function') updateLanguage(lang);
      return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach(item => {
      // Robust price parsing
      const priceString = item.price.replace(/[^0-9.]/g, '');
      const itemPrice = parseFloat(priceString);
      const itemTotal = (isNaN(itemPrice) ? 0 : itemPrice) * item.quantity;
      total += itemTotal;

      cartHTML += `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <p class="cart-item-price">${item.price}</p>
            <div class="cart-item-quantity">
              <button class="quantity-btn minus" data-id="${item.id}">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${item.id}"><ion-icon name="trash-outline"></ion-icon></button>
        </div>
      `;
    });

    const lang = localStorage.getItem('language') || 'en-US';
    const totalText = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang]['total'] : 'Total';
    cartHTML += `<div class="cart-total"><strong>${totalText}: $${total.toFixed(2)}</strong></div>`;

    const checkoutText = (typeof translations !== 'undefined' && translations[lang] && translations[lang]['checkout']) ? translations[lang]['checkout'] : 'Checkout';
    cartHTML += `<button class="btn-newsletter checkout-btn" data-checkout-btn style="width: 100%; margin-top: 15px;">${checkoutText}</button>`;

    cartItemsContainer.innerHTML = cartHTML;

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

    const checkoutBtn = cartItemsContainer.querySelector('[data-checkout-btn]');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function () {
        window.location.href = 'checkout.html';
      });
    }
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

    if (favorites.length === 0) {
      favoritesItemsContainer.innerHTML = '<div class="favorites-empty"><p data-i18n="favorites_empty">No favorites yet.</p></div>';
      const lang = localStorage.getItem('language') || 'en-US';
      if (typeof updateLanguage === 'function') updateLanguage(lang);
      return;
    }

    let favoritesHTML = '';

    favorites.forEach(item => {
      favoritesHTML += `
        <div class="favorites-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="favorites-item-img">
          <div class="favorites-item-details">
            <h4 class="favorites-item-title">${item.title}</h4>
            <p class="favorites-item-price">${item.price}</p>
          </div>
          <button class="favorites-item-heart" data-id="${item.id}"><ion-icon name="heart"></ion-icon></button>
        </div>
      `;
    });

    favoritesItemsContainer.innerHTML = favoritesHTML;

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

    const title = titleElement.textContent;
    const price = priceElement.textContent;
    const id = title.toLowerCase().replace(/\s+/g, '-'); // simple id generation

    return {
      id: id,
      title: title,
      price: price,
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

  // Initial UI update from localStorage
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

});