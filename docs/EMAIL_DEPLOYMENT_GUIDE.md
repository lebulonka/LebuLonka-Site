# 📧 Email System Setup - Complete Guide

## Current Status

Your email system is **NOT working** because:

1. ❌ The send-email.php backend is not receiving requests
2. ❌ OR the PHP mail() function is not configured
3. ❌ OR the files are not deployed to cPanel yet

## How Email System Works

```
Customer places order
       ↓
checkout.js calls sendOrderEmails(orderData)
       ↓
email-service.js generates HTML templates
       ↓
sendEmailViaCPanel() calls send-email.php (via fetch)
       ↓
send-email.php uses PHP mail() function
       ↓
cPanel sends email via your email account (help@lebulonka.in)
```

## Setup Steps

### Step 1: Test Locally First
Since you're developing locally (Windows), **emails won't send** without a PHP server.

To test locally:
1. Install PHP locally: https://www.php.net/manual/en/install.windows.php
2. OR use a local PHP server tool like Laragon: https://laragon.org/
3. OR use VS Code Live Server extension (but still won't send real emails)

### Step 2: Deploy to cPanel

**Upload these files to cPanel public_html:**
```
/send-email.php ← CRITICAL FILE
/email-test.php ← FOR TESTING
/index.html
/checkout.html
/css/ (entire directory)
/js/ (entire directory including email-service.js)
/product-images/ (entire directory)
```

### Step 3: Run Diagnostic Test

**Access your diagnostic page:**
```
https://yourdomain.com/email-test.php
```

This will tell you:
- ✓ PHP version
- ✓ If mail() function is enabled
- ✓ If send-email.php file exists
- ✓ Let you send a test email

### Step 4: Verify Email Configuration

In cPanel:
1. Go to **Email Accounts**
2. Verify **help@lebulonka.in** exists
3. Go to **Mail** → **Mail Queue** to check for stuck emails
4. Go to **Mail** → **Mail Log** to see sending activity

### Step 5: Place a Test Order

1. Go to your website
2. Add items to cart
3. Click Checkout
4. Fill form and place order
5. Open **Browser Console** (F12)
6. Look for logs starting with `📧 [Email Service]`

### Step 6: Check Emails

**Two emails should be sent:**

1. **Customer Email** - To the email they entered
   - Order confirmation
   - Order details and items
   - Total amount
   - Next steps

2. **Admin Email** - To dev@lebulonka.in
   - New order notification
   - Customer details
   - Items and total

## Troubleshooting

### Problem: "Network error" in console

**Cause:** send-email.php file not found or in wrong location

**Solution:**
1. Verify file is at: `/public_html/send-email.php`
2. NOT at: `/public_html/js/send-email.php`
3. Check file permissions (644 or 755)

### Problem: HTTP 405 error

**Cause:** File exists but not accepting POST requests

**Solution:**
1. Verify send-email.php header is correct:
   ```php
   header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
   ```

### Problem: "Email send failed"

**Cause:** PHP mail() function not working

**Solution:**
1. Run email-test.php diagnostic
2. Check if "mail_function_enabled" is YES
3. Contact hosting provider if mail() is disabled

### Problem: Email arrives in spam folder

**Solution:**
1. Configure SPF record in DNS:
   ```
   v=spf1 include:yourhostingprovider.com ~all
   ```
2. Add DKIM key (cPanel → Email → Email Deliverability)
3. Send test email to Gmail and mark as "Not spam"

## File Locations (After cPanel Upload)

```
public_html/
├── index.html
├── checkout.html
├── send-email.php ← Email backend
├── email-test.php ← Test page
├── vercel.json
├── css/
│   ├── style.css
│   └── checkout.css
├── js/
│   ├── app.js
│   ├── checkout.js
│   ├── coupons.js
│   ├── products.js
│   ├── reviews.js
│   ├── firebase-config.js
│   └── email-service.js
└── product-images/
```

## Quick Checklist

- [ ] send-email.php uploaded to public_html
- [ ] help@lebulonka.in email account exists in cPanel
- [ ] Run email-test.php and see diagnostic
- [ ] Send test email via email-test.php form
- [ ] Place test order on website
- [ ] Check browser console for email logs
- [ ] Verify emails received (check spam folder too)
- [ ] Delete email-test.php for security after testing

## Email Service Configuration

Current config in email-service.js:
```javascript
const emailConfig = {
    fromEmail: 'help@lebulonka.in',
    adminEmail: 'dev@lebulonka.in',
    restaurantName: 'লেবু লঙ্কা - Lebu Lonka',
    emailEndpoint: '/send-email.php'
};
```

To change:
1. Edit js/email-service.js
2. Update `fromEmail` - the sending email
3. Update `adminEmail` - where admin notifications go
4. Update `emailEndpoint` - path to PHP file

## Still Not Working?

1. **Check browser console** (F12) for exact error message
2. **Run email-test.php** to test PHP mail() function
3. **Check cPanel Mail Log** for sending attempts
4. **Contact hosting provider** if mail() is disabled
5. **Verify email addresses exist** in cPanel Email Accounts

## Next Steps

After email is working:
1. Test with real customer email addresses
2. Monitor cPanel Mail Log for delivery
3. Set up SPF/DKIM for better deliverability
4. Remove email-test.php from public_html for security
