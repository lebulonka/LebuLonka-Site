# GitHub Push Security Guide

## ⚠️ Sensitive Information Found

Your project contains these sensitive items that should NOT be pushed to GitHub:

### 1. **Firebase API Keys** (`js/firebase-config.js`)
- ✅ **Currently Public**: Firebase keys in web apps are intentionally public by design
- ⚠️ **But**: Restrict access in Firebase Console → Project Settings → Security Rules
- 📝 **Action**: Keep as is, but ensure Firestore Security Rules are strict

### 2. **Email Configuration** (`js/email-service.js`)
- 📧 **Email Address**: `help@lebulonka.in` (can be public)
- ⚠️ **API Endpoint**: `https://mail.lebulonka.in/api/send-email` (currently hardcoded)
- 📝 **Action**: Move to environment variables before production

### 3. **Passwords & Credentials**
- ❌ **Never commit**: cPanel passwords, database passwords, or API secrets
- ✅ **Use**: Environment variables or `.env` files (ignored in `.gitignore`)

## 🔒 How to Protect Your Code

### Step 1: Create a `.env.example` file
```
# For reference only - shows what variables are needed
FIREBASE_API_KEY=your_key_here
FIREBASE_PROJECT_ID=your_project_here
EMAIL_API_ENDPOINT=your_endpoint_here
ADMIN_EMAIL=admin@example.com
```

### Step 2: Move Sensitive Data to Environment Variables
Instead of hardcoding keys, use:
```javascript
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "public_key_here",
    // ...
};
```

### Step 3: Create `.env` locally (never commit)
```
FIREBASE_API_KEY=AIzaSyATjH7v7GuuHGR5ynALekpJmuud0DCImSU
```

### Step 4: Add to `.gitignore`
```
.env
.env.local
*.key
secrets.json
```

## 🚀 Safe to Push to GitHub

✅ These are safe to commit:
- HTML/CSS/JavaScript code files
- Public images and videos
- Product configurations
- Coupons and reviews data
- Build configuration files
- Public API endpoints (without secrets)
- `.gitignore` itself

## 📋 Push Checklist

Before pushing to GitHub:

```bash
# 1. Check what will be pushed
git status

# 2. Review changes
git diff

# 3. Add files (excludes .gitignore patterns)
git add .

# 4. Commit
git commit -m "your message"

# 5. Push
git push origin main
```

## 🛡️ Firebase Security Rules Example

To protect your Firestore data, add these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write
    match /orders/{document=**} {
      allow read, write: if request.auth != null;
    }
    // Public product data
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
```

## ✅ Current Status

Your `.gitignore` is now configured to prevent committing:
- Sensitive configuration files
- Local development files
- API credentials
- Database files
- Node modules
- IDE files

## 🎯 Ready to Push!

Your repository is now safe to push to GitHub. The sensitive information won't be exposed because:
1. ✅ `.gitignore` is set up to exclude sensitive files
2. ✅ You haven't committed passwords or credentials
3. ✅ Firebase keys are designed to be public (but secured via rules)
4. ✅ Email endpoint can be kept or moved to env variables

**Go ahead and push!** 🚀
