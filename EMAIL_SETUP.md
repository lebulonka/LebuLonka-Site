# Email Integration Setup Guide

## Overview
Your Lebu Lonka website now includes automated email notifications for orders:
- **Customer Email**: Order confirmation with itemized receipt
- **Admin Email**: Order notification to your team at `help@lebulonka.in`

## Files Created/Modified

### New Files:
1. **`js/email-service.js`** - Email template generator and service logic
2. **`send-email.php`** - Backend script for sending emails via cPanel

### Modified Files:
1. **`index.html`** - Added email-service.js script
2. **`checkout.html`** - Added email-service.js script  
3. **`js/checkout.js`** - Calls `sendOrderEmails()` after order submission
4. **`js/app.js`** - Calls `sendOrderEmails()` after inline checkout

## Deployment Steps

### Step 1: Upload PHP Backend Script to cPanel

1. **Login to cPanel**: `https://c1.crazzydns.com:2083/` (or your host's cPanel URL)
2. **Go to File Manager** (or use FTP)
3. **Navigate to `public_html/` directory**
4. **Upload `send-email.php`** from your local `LebuLonka-Site` folder
   - This is the backend that actually sends emails

### Step 2: Verify File Permissions

1. In cPanel File Manager, right-click `send-email.php`
2. Click **Permissions**
3. Set to **644** (readable by everyone, writable by owner)
4. Click **Change Permissions**

### Step 3: Upload Website Files

1. Upload all your website files to `public_html/`:
   - `index.html`, `checkout.html`
   - `css/` folder (all CSS files)
   - `js/` folder (all JS files including `email-service.js`)
   - `product-images/` folder
   - `images/` folder (if you have logo)

2. Verify structure:
   ```
   public_html/
   ├── index.html
   ├── checkout.html
   ├── send-email.php
   ├── css/
   │   ├── style.css
   │   └── checkout.css
   ├── js/
   │   ├── app.js
   │   ├── checkout.js
   │   ├── email-service.js
   │   ├── firebase-config.js
   │   └── products.js
   ├── product-images/
   └── images/
   ```

### Step 4: Test Email System

1. **Open your website**: `https://lebulonka.in/` (or your domain)
2. **Place a test order**:
   - Add items to cart
   - Go to checkout
   - Fill in details with your email
   - Click "Place Order"
3. **Check emails**:
   - Check your email inbox (customer confirmation)
   - Check `help@lebulonka.in` (admin notification)
   - Emails should arrive within 1-2 minutes

### Step 5: Monitor Email Logs (Optional)

In cPanel File Manager, look for these log files in `public_html/`:
- **`email-log.txt`** - List of successfully sent emails
- **`email-errors.log`** - Any error messages

You can download and review these files to verify email sending.

## Email Configuration

The email system uses:
- **From Address**: `help@lebulonka.in`
- **SMTP Server**: `c1-inbt.crazzydns.com:465` (SSL)
- **Authentication**: Your cPanel email credentials

These are automatically configured through your hosting provider's mail system.

## Troubleshooting

### Emails Not Arriving

1. **Check spam folder** - Sometimes emails go to spam
2. **Verify send-email.php uploaded correctly**
   - In cPanel File Manager, verify file exists
   - Check file size (should be ~2KB)
3. **Check cPanel email account**
   - Make sure `help@lebulonka.in` account still exists
   - Check email account password hasn't changed
4. **Review error logs**
   - Check `email-errors.log` in `public_html/`

### Email Sends But Looks Wrong

1. Check `email-log.txt` to confirm email was sent
2. Look for template issues in browser console (F12)
3. Verify order data is being captured correctly

## Email Contents

### Customer Receives:
- Order confirmation with their order ID
- Itemized list of products ordered
- Total amount and payment method
- Delivery address confirmation
- Thank you message

### Admin Receives:
- **New Order Alert** notification
- Customer contact information (name, phone, email)
- Complete order details
- Items ordered with quantities
- Total amount
- Timestamp of order

## Security Notes

- ✅ Email service validates all input
- ✅ Uses HTTPS for sending (SSL port 465)
- ✅ Server-side validation on PHP backend
- ✅ No sensitive data stored on frontend
- ✅ Email logs don't contain passwords

## Future Enhancements

Once the basic email system is working, you can add:
- Order status update emails
- Delivery confirmation emails
- Special offer/promotion emails
- Customer feedback requests

## Support

If emails still don't work after following all steps:

1. **Contact your hosting provider** with these details:
   - "Email from PHP not working"
   - Share the contents of `email-errors.log`
   - Mention you're using `mail()` function in PHP

2. **Alternative**: If PHP mail() doesn't work, we can switch to:
   - SendGrid API (free for your volume)
   - Firebase Cloud Functions
   - Another third-party service

## Testing Checklist

- [ ] `send-email.php` uploaded to `public_html/`
- [ ] All website files uploaded to `public_html/`
- [ ] Test order placed successfully
- [ ] Customer confirmation email received
- [ ] Admin email received at `help@lebulonka.in`
- [ ] Email content displays correctly with Bengali text
- [ ] Success modal shows after order submission

Once all items are checked, your email system is ready for production! 🚀
