# লেবু লঙ্কা - Quick Reference Card

## 📋 Important Links & Passwords

### Your Credentials (KEEP SAFE!)
```
Domain: lebulonka.in
Hosting Provider: cPanel Hosting
cPanel Login: https://c1.crazzydns.com:2083/
cPanel Username: [Your username]
cPanel Password: [Your password]

Firebase Project ID: lebulonka-a-bee72
Firebase API Key: AIzaSyAXrdxpn37KrU7iZZBQluWHTWWQWvhtRSY
Firebase Database: Firestore (REST API)

Email Account: help@lebulonka.in
Email Password: [Your password]
SMTP Server: c1-inbt.crazzydns.com:465
```

---

## 🚀 EMAIL SYSTEM - QUICK REFERENCE

### What's New
✅ Automatic customer confirmation emails
✅ Automatic admin order alert emails
✅ Beautiful HTML templates
✅ Professional design with Bengali/English

### Critical Files
```
send-email.php       → Backend email handler
email-service.js     → Email templates & logic
index.html          → Updated (includes email-service.js)
checkout.html       → Updated (includes email-service.js)
app.js              → Updated (calls sendOrderEmails)
checkout.js         → Updated (calls sendOrderEmails)
```

### 3-Step Deployment
```
1. Upload send-email.php + all files to public_html/
2. Set send-email.php permissions to 644
3. Test: Place order & check emails
```

### Monitoring
```
Check: public_html/email-log.txt (success records)
Check: public_html/email-errors.log (errors)
Check: Firebase Console (orders in database)
```

### Email Configuration
```javascript
// In js/email-service.js
const emailConfig = {
    serviceEndpoint: 'https://lebulonka.in/send-email.php',
    fromEmail: 'help@lebulonka.in',
    adminEmail: 'help@lebulonka.in',
    restaurantName: 'Lebu Lonka'
};
```

### What Customer Receives
```
From: help@lebulonka.in
Subject: Order Confirmation - [Order#]
Contents: Order details, items, total, address, thank you
```

### What Admin Receives
```
From: help@lebulonka.in
To: help@lebulonka.in
Subject: New Order Alert - [Order#]
Contents: Customer info, items to prepare, delivery address
```

### Troubleshooting
```
Emails not arriving?
☐ Is send-email.php in public_html/? (check File Manager)
☐ Permissions set to 644? (right-click → Permissions)
☐ Check email-errors.log for error messages
☐ Check spam folder (add to contacts)
☐ Contact hosting support with email-errors.log
```

### Documentatio Files Created
```
EMAIL_SETUP.md              → Full setup guide
DEPLOYMENT_QUICKSTART.md    → 15-minute quickstart
EMAIL_INTEGRATION_SUMMARY.md → System overview
EMAIL_ARCHITECTURE.md       → Technical diagrams
COMPLETE_SETUP.md          → Comprehensive guide
QUICK_REFERENCE.md         → This file
```

---

## 🔧 Essential Files to Update

| File | What to Do | Priority |
|------|-----------|----------|
| `js/products.js` | Add your products data | 🔴 HIGH |
| `images/logo.png` | Upload your logo | 🔴 HIGH |
| `images/product-*.jpg` | Upload product images | 🔴 HIGH |
| `js/firebase-config.js` | Add Firebase credentials | 🟡 MED |
| `index.html` (About section) | Update your story | 🟢 LOW |
| `index.html` (Contact section) | Add your contact info | 🟢 LOW |

---

## 🚀 Launch Checklist (5 minutes per section)

### Before You Start (5 min)
- [ ] Have logo ready
- [ ] Have product images ready (any resolution)
- [ ] Know your product names & prices
- [ ] Have database credentials

### Update Code (10 min)
- [ ] Update `js/products.js`
- [ ] Upload logo to `images/`
- [ ] Upload product images to `images/`
- [ ] Update About section text
- [ ] Update Contact information

### Setup Database (10-15 min)
**Choose ONE:**
- [ ] Firebase (5 min) - See DATABASE_GUIDE.md
- [ ] cPanel MySQL (15 min) - See CPANEL_DATABASE_GUIDE.md

### Test Locally (15 min)
- [ ] Test Add to Cart
- [ ] Test Checkout page
- [ ] Test Order submission
- [ ] Test on Mobile
- [ ] Check browser console (F12) - no errors?

### Deploy (15 min)
- [ ] Upload files to hosting
- [ ] Upload to public_html via cPanel or FTP
- [ ] Test live website
- [ ] Verify database working

**Total: ~75 minutes (1.5 hours)**

---

## 💾 Database Setup Quick Guide

### Firebase (Easy Way)
```
1. firebase.google.com
2. Create Project
3. Setup Firestore
4. Copy config
5. Update js/firebase-config.js
6. Done! ✅
Time: 5 minutes
```

### cPanel MySQL (Full Control)
```
1. cPanel → MySQL Databases
2. Create: lebulonka_db
3. Create user: lebulonka_user
4. Add user to database
5. Create tables in phpMyAdmin
6. Create api/save-order.php
7. Done! ✅
Time: 15 minutes
```

---

## 📱 Product Image Guide

### Image Requirements
- **Format**: JPG, PNG, WebP, GIF
- **Size**: Any resolution (auto-adjusts!)
- **Quality**: 200-2000px width works best
- **Recommended**: 1000x1000px or 1200x1200px

### Upload Process
1. Save image files (any size)
2. Upload to `images/` folder
3. Reference in `js/products.js`
4. Website automatically crops & fits!

### Example
```javascript
{
    id: 1,
    name: 'Product Name',
    image: 'images/product-name.jpg',  // Auto-adjusts!
    price: 50,
    description: 'Description'
}
```

---

## 🎯 What Each File Does

### HTML Files
- **index.html** - Main website (hero, products, about, contact)
- **checkout.html** - Standalone checkout page

### CSS Files
- **style.css** - Main styling & animations (1178 lines)
- **checkout.css** - Checkout page styling (522 lines)

### JavaScript Files
- **products.js** - Your product database (UPDATE THIS!)
- **app.js** - Main logic (products, cart, checkout)
- **checkout.js** - Checkout form logic & calculations
- **firebase-config.js** - Database config (UPDATE THIS!)

### Documentation
- **SETUP_CHECKLIST.md** - Pre-launch checklist
- **DATABASE_GUIDE.md** - Firebase & cPanel setup
- **CPANEL_DATABASE_GUIDE.md** - cPanel detailed guide
- **DOCS.md** - Complete documentation index

---

## 🔌 Database Connection Strings

### Firebase
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcd1234"
};
```

### cPanel MySQL
```
Server: localhost
Database: lebulonka_db
User: lebulonka_user
Password: (your password)
Port: 3306
```

---

## 🛠️ Common Commands

### Check If Files Exist
```powershell
# In project folder
dir /B  # List all files
dir images  # List image files
dir js  # List JS files
```

### Test Locally (Python)
```powershell
# In project folder
python -m http.server 8000
# Then open: http://localhost:8000
```

### FTP Upload via cPanel
```
Host: ftp.yourdomain.com  (or your.domain.com)
User: cpanel_username
Pass: cpanel_password
Folder: public_html
```

---

## 📞 Support Quick Links

### If Using Firebase
- Firebase Console: https://console.firebase.google.com
- Firebase Docs: https://firebase.google.com/docs
- Firestore Guide: DATABASE_GUIDE.md (Option 1)

### If Using cPanel
- cPanel Login: yourdomain.com:2083
- phpMyAdmin: In cPanel → MySQL Databases → phpMyAdmin
- cPanel Guide: CPANEL_DATABASE_GUIDE.md

### General Help
- Check Documentation: DOCS.md
- Setup Help: SETUP_CHECKLIST.md
- Browser Console: Press F12

---

## ⚠️ Critical Security Notes

### NEVER Share These
```
❌ cPanel password
❌ Database password
❌ Firebase API keys
❌ FTP credentials
❌ Email passwords
```

### Keep These Safe
```
✅ Save in password manager
✅ Write down and store securely
✅ Don't commit to Git
✅ Use .env files for secrets
```

### Before Going Live
```
✅ Change default passwords
✅ Enable HTTPS
✅ Set Firestore rules (if Firebase)
✅ Review file permissions
✅ Check database backups
```

---

## 🎨 Color Reference (From Your Logo)

```css
Primary (Deep Red):    #C41E3A
Secondary (Gold):      #FFD700
Accent (Green):        #228B22
```

---

## 📊 Product Data Format

```javascript
{
    id: 1,                              // Unique number
    name: 'লেবু মরিচ চিপস',              // Bengali name
    englishName: 'Lemon Chili Chips',   // English name
    price: 50,                          // Price in rupees
    emoji: '🌶️',                         // Fallback emoji
    image: 'images/lemon-chili.jpg',   // Image path
    description: 'Crispy chips...'      // Short description
}
```

---

## 🔄 Order Object Format

```javascript
{
    id: 1234567890,                  // Timestamp ID
    timestamp: "2024-11-14T...",     // ISO date
    customer: {
        name: "Customer Name",
        email: "customer@email.com",
        phone: "9876543210",
        address: "Full address...",
        notes: "Special instructions"
    },
    items: [...],                    // Cart items
    subtotal: 150,
    discount: 15,                    // SAVE10 coupon
    deliveryCharges: 0,              // Always FREE
    total: 135,                      // After discount
    paymentMethod: "COD",
    couponApplied: "SAVE10",
    status: "Pending"
}
```

---

## ✅ Pre-Launch Final Check

### Website Works?
- [ ] All products showing
- [ ] Images displaying
- [ ] Add to cart works
- [ ] Checkout loads
- [ ] Form submits successfully
- [ ] Success modal appears
- [ ] Mobile looks good
- [ ] No console errors (F12)

### Database Works?
- [ ] Firebase config added OR cPanel setup done
- [ ] Test order appears in database
- [ ] Can view orders in console/phpMyAdmin
- [ ] No connection errors

### Ready to Deploy?
- [ ] All content updated
- [ ] All images uploaded
- [ ] Database credentials saved
- [ ] HTTPS enabled on hosting
- [ ] One final mobile test
- [ ] Share with first customers!

---

## 🚀 You're Ready to Launch!

**Next Action**: 
1. Pick a database (Firebase or cPanel)
2. Open the relevant guide
3. Follow step-by-step instructions
4. Update products
5. Upload to hosting
6. Start selling! 🎉

**Time to Launch**: ~1.5 hours

---

*Save this card for quick reference!*
*Print it or bookmark DOCS.md for full help*
