# 🚀 Quick Deployment Checklist - Email Integration

## Pre-Deployment (You're Here!)

✅ Email service fully integrated
✅ Templates created (customer + admin)
✅ Backend PHP script ready
✅ All files updated with email support
✅ Logging system configured

## Deployment (15 minutes)

### Step 1: Login to cPanel
- URL: `https://c1.crazzydns.com:2083/` (or your host's cPanel)
- Username: Your cPanel username
- Password: Your cPanel password

### Step 2: Upload to public_html

**Option A: Using File Manager (Easy)**
1. Click **File Manager**
2. Navigate to **public_html**
3. Click **Upload** button
4. Select from your `LebuLonka-Site` folder:
   - `send-email.php` ⭐ (MOST IMPORTANT)
   - `index.html`, `checkout.html`
   - Entire `js/` folder
   - Entire `css/` folder
   - `product-images/` folder
   - `images/` folder (if exists)

**Option B: Using FTP (Faster for many files)**
1. Use FileZilla or another FTP client
2. Connect to: `c1-inbt.crazzydns.com`
3. Upload all files to `public_html/`

### Step 3: Fix Permissions
1. Go to **File Manager**
2. Find **send-email.php**
3. Right-click → **Permissions**
4. Set to **644**
5. Click **Change Permissions**

### Step 4: Test
1. Open browser: `https://lebulonka.in/`
2. Place a test order with your email
3. Check inbox for confirmation email
4. Check `help@lebulonka.in` for admin email
5. Both should arrive within 1-2 minutes

## If Emails Don't Arrive

### Check 1: PHP File Uploaded
```
In cPanel File Manager:
- Look for send-email.php in public_html/
- File size should be ~2KB
```

### Check 2: Permissions Correct
```
- Right-click send-email.php
- Check permissions = 644
- NOT 755, NOT 600
```

### Check 3: Check Error Logs
```
In cPanel File Manager → public_html/:
- Download email-errors.log
- Look for error messages
```

### Check 4: Contact Support
```
Your hosting provider support:
"PHP mail() function not working"
Attach: email-errors.log
```

## File Locations on Server

```
lebulonka.in/
├── index.html
├── checkout.html
├── send-email.php ← Backend email handler
├── js/
│   ├── email-service.js ← Email templates
│   ├── checkout.js ← Calls sendOrderEmails()
│   ├── app.js ← Calls sendOrderEmails()
│   ├── firebase-config.js
│   └── products.js
├── css/
│   ├── style.css
│   └── checkout.css
└── product-images/
```

## Email Configuration

**Currently Set To:**
- From: `help@lebulonka.in`
- To (Admin): `help@lebulonka.in`
- Subject: `Order Confirmation - {OrderID}`

**To Change:**
Edit `js/email-service.js`:
```javascript
const emailConfig = {
    serviceEndpoint: 'https://lebulonka.in/send-email.php',
    fromEmail: 'help@lebulonka.in',  // ← Change here
    adminEmail: 'help@lebulonka.in',  // ← Or here
    restaurantName: 'Lebu Lonka'
};
```

## Live Monitoring

After deployment, orders will:
1. ✅ Save to Firebase Firestore
2. ✅ Save to localStorage
3. ✅ Send confirmation email to customer
4. ✅ Send admin email to team

**Check logs**:
- `public_html/email-log.txt` - Success records
- `public_html/email-errors.log` - Error records

## Backup URLs

If main domain has issues:
- Replace `https://lebulonka.in` with your actual domain
- In `email-service.js`:
  ```javascript
  serviceEndpoint: 'https://youractual domain.com/send-email.php'
  ```

## Order Email Flow

```
Customer Places Order
          ↓
[Browser] Validate form & cart
          ↓
[Firebase] Save order to database
          ↓
[cPanel] send-email.php receives request
          ↓
[SMTP] Send email to customer
[SMTP] Send email to admin
          ↓
[Browser] Show success modal
          ↓
✅ Order complete!
```

## Email Contents

**Customer Gets:**
- Order confirmation
- Order ID
- Items list
- Total amount
- Delivery address
- Thank you message

**Admin Gets:**
- New order alert
- Customer contact info
- Items to prepare
- Total to charge
- Special instructions

## Testing Commands

### Test Order Details:
- Name: Test Customer
- Email: your-email@gmail.com
- Phone: 8800000000
- Address: Test address
- Items: Any product

### Expected Result:
- 1 email to your email (customer)
- 1 email to help@lebulonka.in (admin)
- Both within 1-2 minutes

## Support Resources

**Included Documentation:**
- `EMAIL_SETUP.md` - Full setup guide
- `EMAIL_INTEGRATION_SUMMARY.md` - System overview
- `js/email-service.js` - Email templates (editable)
- `send-email.php` - Backend script

**If Stuck:**
1. Check `EMAIL_SETUP.md` troubleshooting
2. Review error logs in cPanel
3. Contact hosting support with logs
4. Email me for backup solutions

## Estimated Timeline

- **Upload files**: 2-5 minutes
- **Set permissions**: 1 minute
- **Test order**: 1 minute
- **Check emails**: 2 minutes
- **Total**: ~10-15 minutes

## Success Indicators

✅ All files uploaded to public_html
✅ send-email.php has 644 permissions
✅ Test order placed successfully
✅ Customer email arrived
✅ Admin email arrived
✅ Both emails show correct order details

---

**Status**: READY FOR DEPLOYMENT 🚀

Need help? Check the detailed guides:
- `EMAIL_SETUP.md` (Full instructions)
- `EMAIL_INTEGRATION_SUMMARY.md` (System overview)
