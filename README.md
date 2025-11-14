# লেবু লঙ্কা - Lebu Lonka Restaurant Website

A modern, responsive Bengali-themed restaurant website for "Lebu Lonka" (লেবু লঙ্কা) - a lemon and chili-based food startup.

## 🎨 Features

### 1. **Responsive Design**
- Mobile-friendly layout
- Smooth animations and transitions
- Bengali language support
- Saffron and red color theme (inspired by Bengali heritage)

### 2. **Navigation**
- Logo with animated lemon icon on top left
- Center navigation menu (Home, Shop, About, Contact)
- Shopping cart icon on top right
- Mobile hamburger menu

### 3. **Home Page Sections**
- **Hero Section**: Eye-catching banner with product image and CTA button
- **Shop Section**: Display of 6 products with:
  - Product images (emoji-based)
  - Product names in Bengali
  - Prices with Indian Rupees symbol (₹)
  - Add to cart functionality
  - Quantity controls
- **About Section**: Company information and mission
- **Reviews Section**: Customer testimonials with 5-star ratings
- **Contact Section**: Contact information and contact form
- **Footer**: Quick links, social media, copyright

### 4. **Shopping Cart**
- Slide-out cart sidebar
- Add/remove items functionality
- Quantity adjustment
- Real-time cart total calculation
- Cart item counter in navbar
- Empty cart message when no items

### 5. **Checkout System**
- Modal-based checkout form
- Customer information collection:
  - Name (নাম)
  - Email (ইমেইল)
  - Phone Number (ফোন নম্বর)
  - Address (ঠিকানা)
  - Additional Notes (অতিরিক্ত নোট)
- Order summary display
- COD (Cash on Delivery) payment method
- Order confirmation with order ID

### 6. **Animations**
- Smooth fade-in effects
- Slide animations for navigation
- Bounce effect on logo
- Float animation on hero image
- Hover effects on products and buttons
- Rotating chili icon in About section

### 7. **Data Persistence**
- LocalStorage for cart management
- LocalStorage for order history
- Firebase integration ready (Firestore for cloud storage)

## 🛠️ Technology Stack

- **HTML5**: Semantic markup with Bengali language support
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: DOM manipulation and event handling
- **Firebase**: Backend for order management (optional)
- **Font Awesome**: Icons for UI elements

## 📁 File Structure

```
LebuLonka-Site/
├── index.html                 # Main HTML file with all sections
├── css/
│   └── style.css             # Complete styling with animations
├── js/
│   ├── app.js                # Main JavaScript functionality
│   └── firebase-config.js    # Firebase configuration
└── README.md                 # Documentation
```

## 🚀 Getting Started

### 1. Basic Setup (No Backend)
The website works immediately without Firebase configuration. It uses localStorage to save cart and orders.

```bash
1. Open index.html in your web browser
2. The site will load with full functionality
3. Cart data persists in browser's localStorage
```

### 2. Firebase Setup (Optional - For Cloud Storage)

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter "Lebu Lonka" as project name
4. Complete the setup wizard

#### Step 2: Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create Database"
3. Choose "Start in production mode"
4. Select a region (preferably nearest to your location)

#### Step 3: Get Firebase Credentials
1. Go to Project Settings (gear icon)
2. Copy your Firebase configuration

#### Step 4: Update Firebase Config
Open `js/firebase-config.js` and replace:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

#### Step 5: Enable Collections
In Firestore:
1. Create a new collection called "orders"
2. Set the document structure as needed (functions in `firebase-config.js` will handle it)

## 📦 Products

The website includes 6 sample products:
1. লেমনেড (ঠান্ডা) - ₹50
2. মশলাদার লেমনেড - ₹60
3. আদা লেমনেড - ₹55
4. লঙ্কার মিশ্রণ - ₹75
5. মধু লেমনেড - ₹65
6. নিম পাতা লেমনেড - ₹70

To modify products, edit the `sampleProducts` array in `js/app.js`.

## 🎨 Color Scheme

- **Primary Color**: #FF6B35 (Saffron-Red)
- **Secondary Color**: #FFD60A (Golden Yellow)
- **Accent Color**: #00A86B (Green)
- **Dark Color**: #1a1a1a (Dark Gray)
- **Light Color**: #f8f8f8 (Light Gray)

These colors are inspired by the Indian and Bengali flag colors.

## 🔧 Key Functions

### Cart Management
```javascript
addToCart(productId)        // Add item to cart
removeFromCart(productId)   // Remove item from cart
increaseQuantity(productId) // Increase quantity
decreaseQuantity(productId) // Decrease quantity
updateCartDisplay()         // Update cart UI
```

### Checkout
```javascript
openCheckout()              // Open checkout modal
submitOrder(event)          // Process order
renderOrderSummary()        // Show order details
```

### Firebase
```javascript
saveOrderToFirebase(orderData)    // Save order to Firebase
loadOrdersFromFirebase()          // Load orders from Firebase
```

## 📱 Responsive Breakpoints

- Desktop: 1200px and above
- Tablet: 768px to 1199px
- Mobile: Below 768px

## ✨ Special Features

1. **Smooth Animations**
   - Page load animations
   - Hover effects on all interactive elements
   - Smooth transitions between sections

2. **Bengali Language Support**
   - Full Bengali text throughout
   - Bengali numerals in prices
   - Bengali month names (when applicable)

3. **User Experience**
   - Toast notifications for user actions
   - Form validation
   - Auto-save cart to localStorage
   - Responsive images and icons

4. **Performance**
   - Minimal external dependencies
   - Optimized CSS and JavaScript
   - Smooth scrolling
   - Efficient event handling

## 🔐 Security Notes

- No sensitive data stored in localStorage
- Firebase Firestore rules should be configured for production
- Admin authentication should be implemented for order management
- Input validation is performed on the client side

## 🐛 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Customization

### Add More Products
Edit `sampleProducts` array in `js/app.js`:
```javascript
{
    id: 7,
    name: 'আপনার পণ্য',
    price: 100,
    description: 'পণ্যের বর্ণনা',
    emoji: '🍋'
}
```

### Change Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #FF6B35;
    --secondary-color: #FFD60A;
    --accent-color: #00A86B;
}
```

### Modify Contact Info
Edit the contact section in `index.html`:
- Phone: +880 1234 567890
- Email: info@lebulonka.com
- Address: ঢাকা, বাংলাদেশ

## 🚀 Deployment

### Using GitHub Pages
1. Push code to GitHub
2. Go to repository Settings
3. Enable GitHub Pages
4. Select main branch as source

### Using Netlify
1. Connect GitHub repository
2. Set build command: (leave empty for static site)
3. Deploy!

### Using Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🤝 Contributing

To contribute or suggest improvements:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is created for "Lebu Lonka" restaurant startup.

## 📞 Support

For issues or questions:
- Email: info@lebulonka.com
- Phone: +880 1234 567890

---

**Made with ❤️ for Lebu Lonka** | 2025
Repo created
