# 📚 Documentation Index - লেবু লঙ্কা Website

## Quick Navigation

### 🚀 Getting Started
- **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Pre-launch checklist & quick start guide
- **[DATABASE_GUIDE.md](DATABASE_GUIDE.md)** - Complete database setup (Firebase & cPanel)
- **[CPANEL_DATABASE_GUIDE.md](CPANEL_DATABASE_GUIDE.md)** - Detailed cPanel database management

### 💾 Database Options

#### Firebase (Recommended for Beginners)
- ✅ Free tier available
- ✅ Real-time database
- ✅ Automatic backups
- ✅ Easy setup (5 minutes)
- [See DATABASE_GUIDE.md - Option 1](DATABASE_GUIDE.md)

#### cPanel MySQL (For Traditional Hosting)
- ✅ Full data control
- ✅ Works with any hosting provider
- ✅ Included with most hosting plans
- ✅ Detailed step-by-step guide
- [See CPANEL_DATABASE_GUIDE.md](CPANEL_DATABASE_GUIDE.md)

---

## 📁 Project Structure

```
LebuLonka-Site/
│
├── 📄 HTML Files
│   ├── index.html              (Main website)
│   └── checkout.html           (Checkout page)
│
├── 📁 css/
│   ├── style.css               (Main styling)
│   └── checkout.css            (Checkout styling)
│
├── 📁 js/
│   ├── products.js             (Product database - UPDATE THIS)
│   ├── app.js                  (Main logic)
│   ├── checkout.js             (Checkout logic)
│   └── firebase-config.js      (Database config - UPDATE THIS)
│
├── 📁 images/                  (Your uploads folder)
│   ├── logo.png                (Your logo)
│   ├── product-1.jpg           (Product images)
│   └── product-2.jpg
│
├── 📚 Documentation
│   ├── README.md               (Original readme)
│   ├── SETUP_CHECKLIST.md      (Launch checklist)
│   ├── DATABASE_GUIDE.md       (Database setup guide)
│   ├── CPANEL_DATABASE_GUIDE.md (cPanel how-to)
│   └── DOCS.md                 (This file)
│
└── 🔧 Config Files
    ├── .git/                   (Version control)
    └── .gitattributes
```

---

## 🎯 Core Features

### ✨ Website Features
- 🏠 Hero section with brand messaging
- 🛍️ Product grid with responsive images
- 🛒 Shopping cart with add/remove functionality
- 💳 Full checkout page with form validation
- 🎟️ Coupon system (SAVE10 = 10% off)
- 📦 Order success modal
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Brand color scheme from your logo

### 🔧 Technical Features
- localStorage persistence (cart, orders)
- Smart product quantity controls
- Cart overlay with smooth animations
- Form validation & sanitization
- Real-time calculations
- Database integration ready
- Firebase compatible
- cPanel MySQL compatible

### 💳 Checkout Features
- Billing details form
- COD (Cash on Delivery) payment method
- Delivery charges (FREE)
- Coupon code validation
- Order summary sidebar
- Order ID generation
- Success notifications

---

## 🔐 Security Checklist

### Before Going Live
- [ ] Update Firebase security rules
- [ ] Set strong database passwords
- [ ] Hide API keys from public view
- [ ] Enable HTTPS on your domain
- [ ] Validate all form inputs
- [ ] Test SQL injection prevention
- [ ] Review cPanel access logs
- [ ] Set proper file permissions (755 folders, 644 files)

### Best Practices
```
Never commit:
- Firebase config with API keys
- Database passwords
- Private credentials
- Admin tokens

Always use:
- .env files for secrets
- HTTPS connections
- Input validation
- Prepared statements
```

---

## 📊 Files to Update Before Launch

### 1. **js/products.js** (HIGH PRIORITY)
Update the `products` array with your actual products:
```javascript
const products = [
    {
        id: 1,
        name: 'Your Product Bengali Name',
        englishName: 'Product Name English',
        price: 50,
        emoji: '🍋',
        image: 'images/product-name.jpg',
        description: 'Your product description'
    },
    // Add more products...
];
```

### 2. **images/** Folder (HIGH PRIORITY)
Upload your:
- `logo.png` - Your company logo
- `product-1.jpg` - Product image 1
- `product-2.jpg` - Product image 2
- etc.

### 3. **js/firebase-config.js** (REQUIRED)
Add your Firebase credentials (if using Firebase):
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 4. **index.html** (RECOMMENDED)
Update:
- Line 247: "About" section text
- Line 269: "Contact" section information
- Footer business details

---

## 🚀 Deployment Steps

### Step 1: Prepare Files (30 minutes)
1. Update `js/products.js` with your products
2. Upload images to `images/` folder
3. Update `index.html` with your info
4. Setup database (Firebase or cPanel)

### Step 2: Test Locally (20 minutes)
1. Open `index.html` in browser
2. Test Add to Cart
3. Test Checkout page
4. Test Order placement
5. Check browser console (F12) for errors

### Step 3: Upload to Hosting (15 minutes)
1. Via cPanel File Manager OR FTP
2. Upload all files to `public_html`
3. Set permissions: 755 (folders), 644 (files)
4. Verify folder structure intact

### Step 4: Test Live Site (20 minutes)
1. Visit your domain
2. Test all functionality
3. Verify database connection
4. Test order submission
5. Check mobile responsiveness

**Total Time: ~2 hours**

---

## 📞 Support Resources

### Documentation Files (In Your Project)
- **SETUP_CHECKLIST.md** - Pre-launch checklist
- **DATABASE_GUIDE.md** - Firebase & cPanel setup
- **CPANEL_DATABASE_GUIDE.md** - cPanel step-by-step

### External Resources
- Firebase Docs: https://firebase.google.com/docs
- cPanel Docs: https://cpanel.net/tutorials
- JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- CSS: https://developer.mozilla.org/en-US/docs/Web/CSS
- PHP: https://www.php.net/docs.php

### Debugging Tools
- Browser DevTools: Press `F12`
- Firebase Console: https://console.firebase.google.com
- cPanel: Your hosting domain:2083
- phpMyAdmin: From cPanel

---

## 🔄 Development Workflow

### Adding a New Product
1. Edit `js/products.js`
2. Add new object to `products` array
3. Upload image to `images/` folder
4. Refresh website - new product appears automatically

### Updating Prices
1. Edit `js/products.js`
2. Change `price` field
3. Website updates automatically (localStorage clears)

### Managing Orders
**If using Firebase:**
- View in: https://console.firebase.google.com
- Collection: `orders`
- No special tools needed

**If using cPanel:**
- View in: phpMyAdmin (from cPanel)
- Table: `orders`
- Edit status, download data, etc.

### Updating Coupon Codes
1. Edit `js/checkout.js`
2. Find `applyCoupon()` function
3. Change the validation logic

---

## ⚠️ Common Issues & Solutions

### "Products Not Showing"
- [ ] Check `js/products.js` has valid data
- [ ] Verify `products.js` loaded before `app.js`
- [ ] Clear browser cache (Ctrl+Shift+Del)
- [ ] Check browser console (F12) for errors

### "Images Not Loading"
- [ ] Verify image file exists in `images/` folder
- [ ] Check file path in `products.js` is correct
- [ ] Try PNG or JPG format
- [ ] Check file permissions (644)

### "Checkout Form Errors"
- [ ] Verify `checkout.js` loaded
- [ ] Check form input names match
- [ ] Verify `products.js` loaded before `checkout.js`
- [ ] Try clearing localStorage: F12 → Application → Clear

### "Orders Not Saving"
- [ ] Check database is setup correctly
- [ ] Verify Firebase config if using Firebase
- [ ] Check Firestore rules allow writes
- [ ] Verify cPanel database created if using MySQL
- [ ] Check browser console (F12) for errors

### "Mobile Page Not Responsive"
- [ ] Check CSS files loaded (F12 → Network)
- [ ] Verify viewport meta tag in HTML
- [ ] Test in Chrome DevTools device mode
- [ ] Clear browser cache

---

## 📈 Future Enhancements

### Phase 2 (After Launch)
- [ ] Customer accounts & login
- [ ] Order tracking system
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Multiple payment methods
- [ ] Product reviews/ratings
- [ ] Wishlist feature
- [ ] Analytics integration

### Phase 3 (Scale)
- [ ] Mobile app
- [ ] Multiple locations
- [ ] Delivery integration
- [ ] Loyalty program
- [ ] Subscription orders
- [ ] Social media integration

---

## 📋 Database Comparison

### Firebase
```
Setup Time: 5 minutes
Cost: Free (with limits)
Real-time: Yes
Backups: Automatic
Best For: Startups, MVPs, Quick launches
Learning Curve: Easy
```

### cPanel MySQL
```
Setup Time: 15 minutes
Cost: Included with hosting
Real-time: No
Backups: Manual
Best For: Traditional hosting, Full control
Learning Curve: Moderate
```

**Recommendation**: Start with Firebase if unsure, migrate to cPanel later if needed.

---

## ✅ Launch Readiness

### Minimum Requirements
- [ ] Products list updated
- [ ] Logo uploaded
- [ ] Database selected & configured
- [ ] Images in place
- [ ] Tested on mobile
- [ ] Forms validated

### Nice to Have
- [ ] Email notifications setup
- [ ] Google Analytics added
- [ ] SEO optimized
- [ ] Social media links added
- [ ] Professional photos

---

## 📞 Getting Help

### For Specific Issues
1. Check the relevant documentation file
2. Search error message in browser console (F12)
3. Check Firebase Console or cPanel logs
4. Review the TROUBLESHOOTING section

### Documentation Priority
1. **CPANEL_DATABASE_GUIDE.md** - If using cPanel
2. **DATABASE_GUIDE.md** - If using Firebase
3. **SETUP_CHECKLIST.md** - General setup help

---

## 🎉 You're Ready!

Your website is fully functional and ready to launch. Follow the checklists, update your content, setup your database, and you'll be live in about 2 hours.

**Next Steps:**
1. Read SETUP_CHECKLIST.md
2. Choose your database (Firebase or cPanel)
3. Follow the relevant guide (DATABASE_GUIDE.md or CPANEL_DATABASE_GUIDE.md)
4. Update products in js/products.js
5. Upload images
6. Test locally
7. Deploy to hosting
8. Test live site

**Happy Launching! 🚀**

---

*Last Updated: November 2024*
*লেবু লঙ্কা Website Platform v1.0*
