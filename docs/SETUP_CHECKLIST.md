# লেবু লঙ্কা - Setup & Deployment Checklist

## Pre-Launch Checklist

### Website Content
- [ ] Update `js/products.js` with your actual products
- [ ] Add product images to `images/` folder
- [ ] Add logo image as `images/logo.png`
- [ ] Update About section with your story
- [ ] Update Contact information
- [ ] Update footer with business details

### Configuration
- [ ] Setup database (Firebase OR cPanel MySQL)
- [ ] Update `js/firebase-config.js` with credentials
- [ ] Test order submission locally
- [ ] Test coupon code "SAVE10"
- [ ] Test "Continue Shopping" button flow

### Testing
- [ ] Test on Desktop (Chrome, Firefox, Safari)
- [ ] Test on Mobile (iPhone, Android)
- [ ] Test on Tablet
- [ ] Test Add to Cart functionality
- [ ] Test Cart overlay close
- [ ] Test Checkout page navigation
- [ ] Test Form validation
- [ ] Test Success modal
- [ ] Test Product images display correctly

### Security
- [ ] Set Firebase rules (Firestore)
- [ ] Hide sensitive API keys
- [ ] Use HTTPS on production
- [ ] Test form input sanitization
- [ ] Verify database connection security

### Performance
- [ ] Compress product images
- [ ] Test page load speed
- [ ] Test on slow 3G connection
- [ ] Check for console errors
- [ ] Verify localStorage working

### Deployment
- [ ] Create production domain
- [ ] Upload files to hosting
- [ ] Setup SSL certificate
- [ ] Configure DNS
- [ ] Test live website
- [ ] Setup email notifications

---

## Quick Start Commands

### Setup Images Folder
```powershell
mkdir images
# Then upload your:
# - logo.png
# - product-1.jpg
# - product-2.jpg
# - etc.
```

### Test Locally
```powershell
# Open in browser
start index.html
# Or if using Python 3
python -m http.server 8000
# Then visit: http://localhost:8000
```

### File Structure Check
```
LebuLonka-Site/
├── index.html              ✅
├── checkout.html           ✅
├── css/
│   ├── style.css          ✅
│   └── checkout.css       ✅
├── js/
│   ├── products.js        ✅ (Update with your products)
│   ├── app.js             ✅
│   ├── checkout.js        ✅
│   └── firebase-config.js ✅ (Update with your config)
├── images/
│   ├── logo.png           ⚠️ (Add your logo)
│   ├── product-1.jpg      ⚠️ (Add your products)
│   └── ...
├── DATABASE_GUIDE.md      ✅
└── SETUP_CHECKLIST.md     ✅
```

---

## Database Setup Steps

### Choose Your Database:

**Option A: Firebase (Recommended for beginners)**
1. Go to [firebase.google.com](https://firebase.google.com)
2. Create new project
3. Setup Firestore Database
4. Copy Firebase config
5. Update `js/firebase-config.js`
6. Test by placing an order

**Option B: cPanel MySQL (For traditional hosting)**
1. Login to cPanel
2. Create MySQL database & user
3. Create tables via phpMyAdmin
4. Create `api/save-order.php` file
5. Update `js/firebase-config.js` with API path
6. Test by placing an order

See `DATABASE_GUIDE.md` for detailed instructions.

---

## Product Management

### Update Products
1. Open `js/products.js`
2. Edit the `products` array:
   ```javascript
   const products = [
       {
           id: 1,
           name: 'Your Product Name',
           englishName: 'Product Name in English',
           price: 50,
           emoji: '🍋',
           image: 'images/your-product.jpg',
           description: 'Short description'
       },
       // ... add more products
   ];
   ```

### Add Product Images
1. Save images as JPG/PNG
2. Upload to `images/` folder
3. Reference in `js/products.js`
4. CSS automatically handles any resolution

### Update Pricing
1. Open `js/products.js`
2. Change the `price` field
3. Website updates automatically

---

## Testing Workflows

### Test Shopping Flow
1. Click "Home" → See hero section
2. Scroll to products
3. Click "Add to Cart" on any product
4. Click cart icon → See product added
5. Click quantity + button → Increase quantity
6. Click "Proceed to Checkout"
7. Fill form details
8. Enter coupon code "SAVE10" → See 10% discount
9. Click "Place Order"
10. See success popup with Order ID
11. Click "Continue Shopping" → Back to home

### Test Mobile Responsiveness
1. Open Chrome DevTools (F12)
2. Click device toolbar icon
3. Select "iPhone 12" or "Pixel 5"
4. Test all buttons and forms
5. Test cart overlay
6. Test checkout form

### Test on Different Browsers
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iPhone)
- [ ] Android Chrome

---

## Deployment to Live Server

### Using cPanel File Manager
1. Login to cPanel
2. Open File Manager
3. Navigate to `public_html`
4. Upload all files:
   - index.html
   - checkout.html
   - css/ folder
   - js/ folder
   - images/ folder
5. Upload DATABASE_GUIDE.md (for reference)

### Using FTP
1. Use FileZilla or similar FTP client
2. Connect with FTP credentials from cPanel
3. Drag & drop files to server
4. Set proper permissions (755 for folders, 644 for files)

### After Upload
1. Visit your domain
2. Test all functionality
3. Check browser console (F12) for errors
4. Verify database connection
5. Test ordering process end-to-end

---

## Important Links & Resources

### Your Website Files
- Main Site: `index.html`
- Checkout: `checkout.html`
- Products Config: `js/products.js`
- Database Config: `js/firebase-config.js`

### External Services
- Firebase: https://firebase.google.com
- Firebase Console: https://console.firebase.google.com
- cPanel: Your hosting domain:2083

### Documentation
- DATABASE_GUIDE.md (in your project)
- Firebase Docs: https://firebase.google.com/docs
- cPanel Docs: https://cpanel.net/tutorials

---

## Troubleshooting

### Website Won't Load
- [ ] Check file paths (case-sensitive)
- [ ] Verify CSS & JS files uploaded
- [ ] Clear browser cache (Ctrl+Shift+Del)
- [ ] Check F12 console for errors

### Orders Not Saving
- [ ] Verify database is setup
- [ ] Check Firebase config in console (F12)
- [ ] Verify Firestore rules allow writes
- [ ] Check for JavaScript errors in console

### Images Not Showing
- [ ] Verify image file paths in products.js
- [ ] Check image files exist in images/ folder
- [ ] Try PNG or JPG format
- [ ] Check file permissions (755)

### Checkout Form Not Working
- [ ] Verify checkout.js loaded (F12 → Network tab)
- [ ] Check form input names match
- [ ] Verify products.js loaded before checkout.js
- [ ] Clear localStorage (DevTools → Application)

---

## Live Site Maintenance

### Regular Tasks
- [ ] Check orders daily
- [ ] Update product images/prices as needed
- [ ] Monitor website performance
- [ ] Backup database weekly
- [ ] Update product descriptions seasonally

### Monthly Review
- [ ] Check analytics (if enabled)
- [ ] Review customer feedback
- [ ] Update product inventory
- [ ] Test all functionality again

### Security Updates
- [ ] Keep Firebase rules updated
- [ ] Monitor suspicious activity
- [ ] Update form validation rules
- [ ] Review access logs

---

## Support & Next Steps

### What's Ready:
✅ Fully functional website
✅ Shopping cart system
✅ Checkout flow
✅ Success notifications
✅ Responsive design
✅ Product management system
✅ Coupon system (SAVE10 = 10% off)
✅ Multiple database options

### What You Need to Add:
- [ ] Your products data
- [ ] Your product images
- [ ] Your logo image
- [ ] Database setup & config
- [ ] Contact info & about content

### Estimated Time to Launch:
- Database setup: 10-15 minutes
- Product upload: 30-60 minutes (depending on quantity)
- Content update: 15-30 minutes
- Testing: 20-30 minutes
- **Total: ~2 hours**

---

## Questions?

Refer to these files:
1. **DATABASE_GUIDE.md** - Complete database setup guide
2. **js/firebase-config.js** - For Firebase integration
3. **js/products.js** - For product management
4. Browser DevTools (F12) - For debugging errors

You're ready to launch! 🚀
