# লেবু লঙ্কা (Lebu Lonka) - E-Commerce Website

A modern, Bengali-first e-commerce platform for selling lemonades and specialty drinks with online ordering, customer reviews, coupon system, and email notifications.

## 🌐 Live Website
- **Production**: https://lebulonka.in
- **Repository**: https://github.com/lebulonka/LebuLonka-Site

## 🎯 Key Features

### 🛍️ Shopping
- ✅ Product catalog with images and descriptions
- ✅ Add to cart with real-time updates
- ✅ Cart persistence via localStorage
- ✅ Product image display in cart
- ✅ Responsive product grid

### 💰 Checkout & Orders
- ✅ Comprehensive checkout form
- ✅ Customer information collection
- ✅ Order summary with totals
- ✅ Coupon code system
- ✅ Free delivery for all orders
- ✅ Order ID generation
- ✅ Firebase Firestore backend

### ⭐ Reviews & Feedback
- ✅ Customer reviews after order
- ✅ 5-star rating system
- ✅ Random reviews on homepage
- ✅ Review persistence

### 🎟️ Coupons
- ✅ Discount code validation
- ✅ Percentage & fixed discounts
- ✅ Usage limits per coupon
- ✅ Easy coupon management

### 📧 Email Notifications
- ✅ Order confirmation emails
- ✅ HTML email templates
- ✅ cPanel email backend
- ✅ Fallback simulation mode

### 🎨 Design
- ✅ Modern responsive layout
- ✅ Bengali language support
- ✅ Hero video background (16:9)
- ✅ Smooth animations
- ✅ Notice banner system
- ✅ Success modal with ratings

## 📁 Project Structure

```
LebuLonka-Site/
├── index.html                    # Homepage
├── checkout.html                 # Checkout page
├── send-email.php               # Email backend
│
├── css/
│   ├── style.css               # Main stylesheet
│   └── checkout.css            # Checkout styles
│
├── js/
│   ├── config.js               # Site configuration
│   ├── app.js                  # Cart & main logic
│   ├── checkout.js             # Checkout processing
│   ├── products.js             # Product database
│   ├── coupons.js              # Coupon system
│   ├── reviews.js              # Reviews database
│   ├── firebase-config.js      # Firebase setup
│   └── email-service.js        # Email service
│
├── images/                      # Website images
├── product-images/              # Product images & video
│
├── .gitignore                  # Git ignore rules
├── .env.example                # Environment template
├── README.md                   # This file
└── vercel.json                 # Deployment config
```

## 🚀 Quick Start

### No Installation Needed!
This is a vanilla JavaScript project - just open in browser or deploy directly.

### Local Testing
```bash
# Using Python 3
python -m http.server 8000

# Using PHP
php -S localhost:8000

# Then visit http://localhost:8000
```

## ⚙️ Configuration

### 1. Site Settings (`js/config.js`)
```javascript
const siteConfig = {
    notice: {
        enabled: true,
        text: "Currently delivering in Howrah only",
        type: "warning"  // warning, info, success, error
    }
};
```

### 2. Products (`js/products.js`)
```javascript
{
    id: 1,
    name: 'Product Name (Bengali)',
    englishName: 'Product Name (English)',
    price: 50,
    emoji: '🌶️',
    image: './product-images/1.jpg',
    description: 'Product description'
}
```

### 3. Coupons (`js/coupons.js`)
```javascript
{
    code: 'SAVE10',
    discount: 10,
    type: 'percentage',  // or 'fixed'
    maxUses: 100,
    description: 'Save 10% on your order'
}
```

### 4. Reviews (`js/reviews.js`)
```javascript
{
    name: 'Customer Name',
    text: 'Review text...',
    rating: 5,
    date: '2025-11-15'
}
```

## 🔥 Firebase Setup

1. **Create Project**
   - Go to https://console.firebase.google.com/
   - Create new project
   - Enable Firestore Database

2. **Get API Keys**
   - Project Settings → API Keys
   - Copy to `js/firebase-config.js`

3. **Set Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /orders/{document=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null;
       }
     }
   }
   ```

## 📧 Email Setup

### Option 1: cPanel (Recommended)
1. Create email account in cPanel
2. Upload `send-email.php` to `public_html`
3. Update endpoint in `js/email-service.js`

### Option 2: Local Testing
- Fallback mode simulates emails to browser console
- Works offline automatically
- Great for development

## 🎬 Hero Video

- **File**: `product-images/video.mp4`
- **Format**: MP4 (H.264)
- **Ratio**: 16:9
- **Resolution**: 720p recommended
- **Playback**: Auto, muted, looping

## 🔐 Security

### Protected Files
- `.gitignore` prevents sensitive file commits
- `.env.example` shows template only
- Firebase keys are public-by-design (secured by rules)

### Security Rules
- Firestore restricted to authenticated users
- Email credentials not in code
- Input validation on all forms

### What's Committed
✅ Code, images, configuration
❌ Passwords, credentials, private keys

## 📱 Responsive Design

- ✅ Mobile first approach
- ✅ Tablet optimized
- ✅ Desktop enhanced
- ✅ Touch-friendly on mobile

## 🌐 Deployment

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### cPanel Hosting
1. FTP all files to `public_html`
2. Upload `send-email.php`
3. Point domain to public_html
4. Update endpoints in config

### Traditional Hosting
- Just upload via FTP
- No build process
- Works everywhere

## 🧪 Testing Checklist

- [ ] Products display correctly
- [ ] Add to cart works
- [ ] Cart updates in real-time
- [ ] Coupon codes apply discount
- [ ] Checkout form validates
- [ ] Order saves to Firebase
- [ ] Email sends/simulates
- [ ] Reviews display on homepage
- [ ] Notice banner shows
- [ ] Mobile responsive

## 📊 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📝 Documentation

- **README.md** - This file
- **GITHUB_SECURITY.md** - GitHub security info
- **SENSITIVE_DATA_NOTICE.md** - Data protection
- **COUPONS_GUIDE.md** - Coupon management
- **REVIEWS_GUIDE.md** - Reviews system
- **EMAIL_DEPLOYMENT_GUIDE.md** - Email setup
- **.env.example** - Environment variables

## 🐛 Troubleshooting

### Emails Not Sending
- Check `send-email.php` in public_html
- Verify email account exists
- Check browser console for errors
- Fallback mode works offline

### Firebase Issues
- Verify API key in firebase-config.js
- Check Security Rules allow writes
- Use browser DevTools Network tab
- localStorage fallback saves data

### Cart Not Saving
- Check localStorage enabled
- Clear cache and reload
- Not in Private/Incognito mode
- Check browser storage in DevTools

### Images Missing
- Verify image paths in products.js
- Check product-images folder exists
- Upload to server if needed
- Fallback shows emoji

## 📞 Support

**Email**: help@lebulonka.in  
**Website**: https://lebulonka.in  
**GitHub**: https://github.com/lebulonka/LebuLonka-Site

## 📄 License

Proprietary - All rights reserved © 2025 LebuLonka

## 🎉 Changelog

### v2.0 (Nov 15, 2025)
- ✅ Hero section with video background
- ✅ Customer review system
- ✅ Notice banner configuration
- ✅ Product images in cart
- ✅ Enhanced styling
- ✅ Security improvements

### v1.0 (Initial)
- ✅ Core e-commerce
- ✅ Cart & checkout
- ✅ Firebase integration
- ✅ Email notifications

---

**Ready to Deploy!** ✨

```bash
git add .
git commit -m "v2.0: Final release with all features"
git push origin main
```
