# Sale Buy Now

A modern, responsive e-commerce website built with HTML, CSS, and JavaScript. This project showcases a fully functional online shopping platform with features like product browsing, shopping cart, favorites, search, and multi-language support.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Product Catalog**: Browse products by categories (Fashion, Electronics, Jewelry, Perfume, etc.)
- **Shopping Cart**: Add/remove items, update quantities, persistent storage using localStorage
- **Favorites**: Save favorite products for later
- **Search Functionality**: Real-time product search
- **Product Quick View**: Modal popup for product details
- **Multi-language Support**: English, Spanish, and French translations
- **Currency Selection**: USD and EUR options
- **Newsletter Subscription**: Email signup modal
- **User Authentication**: Login/Register modals (frontend only)
- **Checkout Process**: Complete checkout flow with payment options
- **Blog Section**: Fashion and shopping-related articles
- **Toast Notifications**: Real-time purchase notifications

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling with responsive design
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **IonIcons**: Icon library for UI elements
- **Google Fonts**: Poppins font family
- **Local Storage**: Client-side data persistence

## Project Structure

```
sale-buy-now/
├── index.html              # Main homepage
├── checkout.html           # Checkout page
├── assets/
│   ├── css/
│   │   ├── style.css       # Main stylesheet
│   │   └── style-prefix.css # CSS prefixes for compatibility
│   ├── js/
│   │   ├── script.js       # Main JavaScript functionality
│   │   └── i18n.js         # Internationalization
│   └── images/             # Product images, banners, icons
│       ├── products/       # Product photos
│       ├── banner-1.jpg    # Homepage banners
│       ├── banner-2.jpg
│       ├── banner-3.jpg
│       ├── logo/
│       │   └── logo.svg    # Site logo
│       └── icons/          # Category icons
└── README.md               # Project documentation
```

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/sale-buy-now.git
   cd sale-buy-now
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - No server setup required for basic functionality

3. **For development**:
   - Use a local server for better development experience
   - Example with Python: `python -m http.server 8000`
   - Example with Node.js: `npx serve .`

## Usage

### Navigation
- Use the desktop navigation menu or mobile hamburger menu
- Browse products by category using the sidebar or category icons

### Shopping
- Click product images or "eye" icons for quick view
- Add items to cart using "Add to Cart" buttons or cart icons
- View cart by clicking the cart icon in the header
- Manage cart items: update quantities or remove items

### Favorites
- Click heart icons to add/remove favorites
- View favorites by clicking the heart icon in the header

### Search
- Use the search bar in the header
- Search works in real-time as you type

### Language & Currency
- Change language using the dropdown in the header
- Switch between USD and EUR currencies

### Checkout
- Click "Checkout" in the cart modal
- Fill billing details and select payment method
- Complete purchase (frontend simulation)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Detail

### Cart Management
- Persistent cart using browser localStorage
- Quantity controls (+/- buttons)
- Automatic total calculation
- Cart count display in header and mobile navigation

### Product Showcase
- Multiple product sections: New Arrivals, Trending, Top Rated
- Deal of the Day with countdown timer
- Product ratings and pricing
- Hover effects for product images

### Responsive Design
- Mobile-first approach
- Collapsible navigation for mobile
- Touch-friendly interface
- Optimized layouts for all screen sizes

### Internationalization
- Three language support: English, Spanish, French
- Dynamic content translation
- Persistent language preference

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

Copyright © 2027 Sale Buy Now. All rights reserved.

## Contact

- Address: 419 State 414 Rte, Beaver Dams, New York(NY), 14812, USA
- Phone: (607) 936-8058
- Email: example@gmail.com

## Acknowledgments

- Icons provided by [Ionicons](https://ionic.io/ionicons)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Product images sourced from various free stock photo sites