# Email Server Configuration - cPanel Custom Server

## Updated Server Details (November 15, 2025)

### Incoming Mail Server
```
Protocol: IMAP
Server: c1-inbt.crazzydns.com
Port: 993
Security: SSL
Authentication: Yes (Required)
Username: dev@lebulonka.in
```

**Alternative (POP3):**
```
Protocol: POP3
Server: c1-inbt.crazzydns.com
Port: 995
Security: SSL
Authentication: Yes (Required)
Username: dev@lebulonka.in
```

### Outgoing Mail Server (SMTP)
```
Server: c1-inbt.crazzydns.com
Port: 465
Security: SSL/TLS Required
Authentication: Yes (Required)
Username: dev@lebulonka.in
Password: [Your email account password]
```

## Account Details
- **Email Address:** dev@lebulonka.in
- **Display Name:** লেবু লঙ্কা - Lebu Lonka
- **Auth Method:** LOGIN
- **Encryption Required:** Yes (SSL/TLS on all ports)

## Configuration in Applications

### For Node.js / Express (Backend)
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'c1-inbt.crazzydns.com',
    port: 465,
    secure: true, // SSL
    auth: {
        user: 'dev@lebulonka.in',
        pass: 'your-password-here'
    }
});
```

### For Email Clients (Outlook, Thunderbird, etc.)
1. **Incoming Server:**
   - Type: IMAP
   - Server: c1-inbt.crazzydns.com
   - Port: 993
   - Security: SSL
   - Username: dev@lebulonka.in

2. **Outgoing Server:**
   - Server: c1-inbt.crazzydns.com
   - Port: 465
   - Security: SSL/TLS
   - Authentication: Yes
   - Username: dev@lebulonka.in

### Current Implementation
In `js/email-service.js`, the configuration has been updated to:
- Use cPanel's email server instead of Gmail
- Port 465 for secure SMTP connections
- Username: dev@lebulonka.in
- All connections use SSL/TLS encryption
- Authentication required for all protocols

## Security Notes
- ⚠️ **Never commit passwords to version control**
- Use environment variables for sensitive credentials
- Password should be set in backend/.env file
- SMTP requires authentication for security

## Testing

### Test SMTP Connection
```bash
# Using telnet (for testing connectivity)
telnet c1-inbt.crazzydns.com 465

# Using openssl
openssl s_client -connect c1-inbt.crazzydns.com:465
```

### Test with Node.js
```javascript
const transporter = nodemailer.createTransport({
    host: 'c1-inbt.crazzydns.com',
    port: 465,
    secure: true,
    auth: { user: 'dev@lebulonka.in', pass: 'password' }
});

transporter.verify((error, success) => {
    if (error) console.log('Error:', error);
    else console.log('Server ready to send emails');
});
```

## Previous Configuration
- ~~SMTP: smtp.gmail.com (Port 587)~~
- ~~Username: your-email@gmail.com~~
- Replaced with cPanel custom server on November 15, 2025

## Status
✅ Configuration updated for cPanel server
✅ Prototype phase active
⏳ Backend implementation pending
⏳ Password configuration via environment variables needed

---

**Last Updated:** November 15, 2025  
**Current Status:** Active for LebuLonka prototype

