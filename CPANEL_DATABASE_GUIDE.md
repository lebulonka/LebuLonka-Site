# cPanel Database Management Quick Guide

## What is cPanel?
A web hosting control panel that lets you manage your website, databases, emails, and more. Most shared hosting providers (GoDaddy, Bluehost, HostGator) include cPanel.

---

## Accessing cPanel

### Login
1. **URL**: `yourdomain.com:2083` or `yourdomain.com/cpanel`
2. **Username**: Your hosting account username
3. **Password**: Your hosting account password
4. Click "Log In"

### You Should See:
- Left sidebar with various options
- Main dashboard area
- Search bar to find features

---

## Creating Your Database

### Step 1: Create Database
1. Find "MySQL® Databases" in cPanel (use search if needed)
2. Click on it
3. Under "Create New Database":
   - Database name: `lebulonka_db`
   - Click "Create Database"
4. You'll see: "Database lebulonka_db has been created successfully"

### Step 2: Create Database User
1. Scroll down to "MySQL Users"
2. Click "Create New User"
3. Fill in:
   - Username: `lebulonka_user`
   - Password: (create strong password)
   - Password Again: (repeat password)
4. Click "Create User"
5. **SAVE THIS PASSWORD! You'll need it later.**

### Step 3: Add User to Database
1. Scroll to "Add User to Database"
2. Select:
   - User: `lebulonka_user`
   - Database: `lebulonka_db`
3. Click "Add"
4. Check ALL privileges checkbox
5. Click "Make Changes"

---

## Access phpMyAdmin (Database Editor)

### Open phpMyAdmin
1. In cPanel, find "phpMyAdmin"
2. Click it
3. New window opens

### You'll See:
- Left sidebar: Your databases listed
- Main area: Database contents
- Top menu: Tools and options

---

## Creating Database Tables

### Create Orders Table

1. **Select Database**
   - Left sidebar → Click `lebulonka_db`

2. **Create New Table**
   - Look for "Create Table" button
   - Table name: `orders`
   - Number of columns: `15`
   - Click "Go"

3. **Add Column Details**
   - Fill each row with this info:

```
Column 1: id
  - Type: INT
  - Extra: AUTO_INCREMENT
  - Primary Key: Check ✓

Column 2: order_id
  - Type: BIGINT
  
Column 3: timestamp
  - Type: DATETIME
  - Default: CURRENT_TIMESTAMP

Column 4: customer_name
  - Type: VARCHAR(100)

Column 5: customer_email
  - Type: VARCHAR(100)

Column 6: customer_phone
  - Type: VARCHAR(20)

Column 7: customer_address
  - Type: TEXT

Column 8: customer_notes
  - Type: TEXT

Column 9: items
  - Type: JSON

Column 10: subtotal
  - Type: DECIMAL(10,2)

Column 11: discount
  - Type: DECIMAL(10,2)

Column 12: delivery_charges
  - Type: DECIMAL(10,2)

Column 13: total
  - Type: DECIMAL(10,2)

Column 14: coupon_applied
  - Type: VARCHAR(50)

Column 15: status
  - Type: VARCHAR(50)
  - Default: Pending
```

4. Click "Save"

### Create Customers Table

1. Click on database again
2. Create new table: `customers`
3. Number of columns: `6`

```
Column 1: id
  - Type: INT
  - Extra: AUTO_INCREMENT
  - Primary Key: Check ✓

Column 2: email
  - Type: VARCHAR(100)
  - UNIQUE: Check ✓

Column 3: name
  - Type: VARCHAR(100)

Column 4: phone
  - Type: VARCHAR(20)

Column 5: total_orders
  - Type: INT
  - Default: 0

Column 6: created_date
  - Type: TIMESTAMP
  - Default: CURRENT_TIMESTAMP
```

4. Click "Save"

---

## Managing Your Data in phpMyAdmin

### View Your Orders
1. Left sidebar: Select `lebulonka_db`
2. Select `orders` table
3. Click "Browse" tab
4. You'll see all orders in table format

### Search for Specific Order
1. Click "Search" tab
2. Select column to search (e.g., `customer_email`)
3. Enter search value
4. Click "Go"

### Edit an Order
1. In Browse view, click "Edit" icon (pencil) for any row
2. Change values
3. Click "Go" to save

### Update Order Status
1. Find the order in Browse view
2. Click Edit
3. Change `status` from "Pending" to:
   - "Confirmed"
   - "Shipped"
   - "Delivered"
4. Click "Go"

### Delete an Order
1. Find the order
2. Click "Delete" icon (trash)
3. Click "Yes" to confirm

---

## Connect Your Website to cPanel Database

### Create PHP API File

1. **Open File Manager in cPanel**
2. Navigate to `public_html` folder
3. Create new folder: `api`
4. Inside `api` folder, create new file: `save-order.php`

### Add This Code to save-order.php

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Database credentials (from your cPanel)
$servername = "localhost";
$username = "lebulonka_user";        // User you created
$password = "your_password_here";     // Password you created
$dbname = "lebulonka_db";            // Database you created

// Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connection failed: ' . $conn->connect_error]));
}

// Get the JSON data from website
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // Extract data safely
    $order_id = intval($data['id']);
    $name = $conn->real_escape_string($data['customer']['name']);
    $email = $conn->real_escape_string($data['customer']['email']);
    $phone = $conn->real_escape_string($data['customer']['phone']);
    $address = $conn->real_escape_string($data['customer']['address']);
    $notes = $conn->real_escape_string($data['customer']['notes']);
    $items = json_encode($data['items']);
    $subtotal = floatval($data['subtotal']);
    $discount = floatval($data['discount']);
    $delivery = floatval($data['deliveryCharges']);
    $total = floatval($data['total']);
    $coupon = $data['couponApplied'] ? $conn->real_escape_string($data['couponApplied']) : NULL;
    
    // Insert into database
    $sql = "INSERT INTO orders (order_id, customer_name, customer_email, customer_phone, customer_address, customer_notes, items, subtotal, discount, delivery_charges, total, coupon_applied, status) 
            VALUES ($order_id, '$name', '$email', '$phone', '$address', '$notes', '$items', $subtotal, $discount, $delivery, $total, '$coupon', 'Pending')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Order saved successfully']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No data received']);
}

$conn->close();
?>
```

### Update Your Website Code

Open `js/firebase-config.js` and add this function:

```javascript
// Save order to cPanel database
async function saveOrderTocPanel(orderData) {
    try {
        const response = await fetch('api/save-order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        if (result.success) {
            console.log('Order saved to cPanel database');
        } else {
            console.error('Error saving to cPanel:', result.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

Then in `js/checkout.js`, update the `submitCheckoutForm()` function to call this:

```javascript
// After clearing cart, add this line:
saveOrderTocPanel(orderData);  // Save to cPanel database
```

---

## Backing Up Your Database

### Automatic Backup (cPanel)
1. In cPanel, find "Backups"
2. You can set automatic backups here
3. Check your hosting plan for backup frequency

### Manual Backup (phpMyAdmin)
1. Open phpMyAdmin
2. Select your database: `lebulonka_db`
3. Click "Export" tab
4. Format: **SQL**
5. Click "Go"
6. File downloads: `lebulonka_db.sql`
7. Save it safely!

### Restore from Backup
1. Open phpMyAdmin
2. Select your database
3. Click "Import" tab
4. Click "Choose File"
5. Select your `lebulonka_db.sql` file
6. Click "Go"

---

## Important Security Notes

### Never Share These:
- ❌ Database password
- ❌ cPanel password
- ❌ FTP password
- ❌ Your username

### Security Best Practices:
1. **Use Strong Passwords**
   - At least 12 characters
   - Mix of letters, numbers, symbols
   - Example: `Lebu@2024Lonka#Safe`

2. **Limit User Permissions**
   - Only give API file what it needs
   - Don't make database users admins

3. **Validate All Inputs**
   - Check phone number format
   - Check email format
   - Prevent SQL injection

4. **Use HTTPS**
   - cPanel often provides free SSL
   - Enable it for your domain

---

## Troubleshooting

### "Connection refused" Error
- [ ] Check MySQL service is running (cPanel status)
- [ ] Verify username/password are correct
- [ ] Check database exists
- [ ] Wait 15 minutes after creating database

### "Access denied for user" Error
- [ ] Verify you added user to database
- [ ] Check user had all privileges granted
- [ ] Reset user password and try again

### Orders Not Appearing in Database
- [ ] Check `api/save-order.php` file exists
- [ ] Verify file path is correct: `api/save-order.php`
- [ ] Check file permissions: `644`
- [ ] Look at browser console (F12) for errors
- [ ] Check PHP error logs in cPanel

### Large Database Size
- [ ] Delete old test orders
- [ ] Archive old orders to separate table
- [ ] Contact hosting provider about storage

### Can't Access phpMyAdmin
- [ ] Try URL: `yourhosting.com/cpanel/frontend/paper_lantern/mysql/index.html`
- [ ] Contact hosting provider for help
- [ ] Check if MySQL is included in your plan

---

## Quick Checklists

### First-Time Setup (15 minutes)
- [ ] Login to cPanel
- [ ] Create database `lebulonka_db`
- [ ] Create user `lebulonka_user`
- [ ] Add user to database
- [ ] Open phpMyAdmin
- [ ] Create `orders` table
- [ ] Create `customers` table

### Connect Website to Database (10 minutes)
- [ ] Create `api/save-order.php` file
- [ ] Update password in PHP file
- [ ] Upload file to server
- [ ] Test by placing an order
- [ ] Check phpMyAdmin for order

### Daily Management
- [ ] Check new orders in phpMyAdmin
- [ ] Update order status if needed
- [ ] Review customer emails

### Weekly Tasks
- [ ] Create database backup
- [ ] Review sales numbers
- [ ] Check for errors in PHP logs

---

## Useful Links

- cPanel Tutorials: https://cpanel.net/tutorials
- phpMyAdmin Docs: https://docs.phpmyadmin.net
- MySQL Docs: https://dev.mysql.com/doc
- PHP Documentation: https://www.php.net/docs.php

---

## When to Contact Hosting Provider

Contact your hosting provider if:
- MySQL service won't start
- Can't access cPanel
- Out of disk space
- Need to increase database limits
- Having persistent connection issues
- Need help with SSL certificate

**Your Hosting Support Email**: (Check your hosting welcome email)

---

You're all set! Your cPanel database is ready to store customer orders. 🎉
