# 📧 Email Testing Guide - lebulonka.in

## Quick Test Links

**Test if send-email.php is accessible:**
```
https://lebulonka.in/send-email.php
```
Should return: `{"error": "Missing required fields..."}` (JSON error is good!)

**Run diagnostic test:**
```
https://lebulonka.in/email-test.php
```
Shows server configuration and lets you send test emails

---

## Step-by-Step Testing

### Step 1: Verify Files Are Uploaded

Check that these are in your cPanel public_html:
```
✓ send-email.php
✓ email-test.php
✓ index.html
✓ checkout.html
✓ css/ directory
✓ js/ directory (including email-service.js)
```

### Step 2: Test send-email.php Directly

1. Open browser and go to:
   ```
   https://lebulonka.in/send-email.php
   ```

2. You should see JSON response like:
   ```json
   {"error": "Missing required fields: to, subject, htmlContent"}
   ```

   **If you see this: ✅ SUCCESS! File is working**

3. If you see:
   - **404 Not Found** → File not in public_html
   - **500 Error** → PHP issue on server
   - **Blank page** → PHP not processing

### Step 3: Run Email Diagnostic

1. Go to:
   ```
   https://lebulonka.in/email-test.php
   ```

2. You'll see server configuration showing:
   - PHP version
   - Mail function enabled (YES/NO)
   - SMTP settings
   - send-email.php exists (YES/NO)

3. Fill in the email field and click "Send Test Email"
   - Should send test email to that address
   - Check inbox AND spam folder

### Step 4: Place Test Order

1. Go to: https://lebulonka.in
2. Add items to cart
3. Click "Checkout"
4. Fill form with your test email address
5. Click "Place Order"
6. Watch browser console (F12 → Console tab)

**Look for these console messages:**
```
📧 [Email Service] === SENDING EMAIL ===
📧 TO: your-email@example.com
📧 SUBJECT: Order Confirmation...
📧 ENDPOINT: https://lebulonka.in/send-email.php
📧 Making fetch request...
📧 Response received
📧 Status: 200 OK
✅ [Email Service] Email sent successfully!
```

### Step 5: Check Email Received

Check both:
- **Your test email inbox** (order confirmation)
- **dev@lebulonka.in inbox** (admin notification)
- **Check SPAM/PROMOTIONS folders too!**

---

## Email Configuration for lebulonka.in

**Current Setup:**
```javascript
{
    fromEmail: 'help@lebulonka.in',      // Sender address
    adminEmail: 'dev@lebulonka.in',      // Admin receives notifications
    emailEndpoint: 'https://lebulonka.in/send-email.php'
}
```

**Email Accounts Needed in cPanel:**
- ✅ help@lebulonka.in (must exist for sending)
- ✅ dev@lebulonka.in (must exist to receive admin notifications)

**To Create Email Accounts in cPanel:**
1. Login to cPanel
2. Go to: **Email Accounts**
3. Create **help@lebulonka.in** (if not exists)
4. Create **dev@lebulonka.in** (if not exists)
5. Set secure passwords

---

## Troubleshooting

### Problem: "404 Not Found" when visiting send-email.php

**Solution:**
1. Login to cPanel File Manager
2. Navigate to public_html
3. Verify send-email.php is there
4. Check file permissions (should be 644 or 755)
5. If missing, upload it again

### Problem: "Method Not Allowed (405)" in console

**Solution:**
1. This shouldn't happen on cPanel (cPanel handles POST correctly)
2. Try refreshing the page (Ctrl+Shift+R)
3. Check that send-email.php is not in a subdirectory
4. Contact hosting provider if persists

### Problem: Email sending fails but no error message

**Check in cPanel:**
1. **Mail → Mail Log** - look for sending attempts
2. **Mail → Mail Queue** - check for stuck emails
3. **Email Accounts** - verify help@lebulonka.in exists
4. **Error Logs** - check for PHP errors

### Problem: Emails arrive in spam folder

**Solution:**
1. This is normal for new domains
2. Ask customers to mark as "Not Spam"
3. Set up SPF record (cPanel → Email Deliverability)
4. Consider using authenticated sender

---

## Email Flow Diagram

```
Customer places order
    ↓
checkout.js calls sendOrderEmails()
    ↓
email-service.js generates HTML templates
    ↓
fetch() calls: https://lebulonka.in/send-email.php
    ↓
send-email.php validates request
    ↓
PHP mail() function sends via cPanel SMTP
    ↓
Email delivered to recipient
```

---

## Test Email Content

### Customer Email Should Include:
- ✅ Order ID
- ✅ Order date
- ✅ All items ordered with quantities
- ✅ Subtotal
- ✅ Discount (if coupon applied)
- ✅ Total amount
- ✅ Delivery address
- ✅ Next steps information

### Admin Email Should Include:
- ✅ New order alert
- ✅ Customer name and contact info
- ✅ Delivery address
- ✅ Items ordered
- ✅ Total amount
- ✅ Payment method (COD)

---

## Quick Checklist

Before considering emails "working":

- [ ] send-email.php accessible at https://lebulonka.in/send-email.php
- [ ] email-test.php shows "mail_function_enabled: YES"
- [ ] help@lebulonka.in exists in cPanel Email Accounts
- [ ] dev@lebulonka.in exists in cPanel Email Accounts
- [ ] Test order placed successfully
- [ ] Console shows "Email sent successfully!" messages
- [ ] Customer received order confirmation email
- [ ] Admin received order notification at dev@lebulonka.in
- [ ] Order saved to Firebase
- [ ] Success modal displayed

---

## Support

If emails still don't work after following this guide:

1. **Check cPanel Mail Log** - shows what was attempted
2. **Check Error Logs** - shows PHP errors if any
3. **Verify email accounts exist** - help@lebulonka.in and dev@lebulonka.in
4. **Test with email-test.php** - confirms mail() function works
5. **Contact hosting provider** if mail() function is disabled
6. **Check domain DNS** - sometimes DNS issues affect email

---

## Next Steps

1. ✅ Upload send-email.php to public_html
2. ✅ Visit https://lebulonka.in/send-email.php to verify
3. ⏳ Create help@lebulonka.in email account
4. ⏳ Create dev@lebulonka.in email account
5. ⏳ Place test order and check console
6. ⏳ Verify emails arrive in both inboxes
7. ⏳ Monitor cPanel Mail Log for activity

**Status: Ready for Testing on Production** ✅
