# লেবু লঙ্কা Database Management Guide

## Overview
You have two options for database management:
1. **Firebase** (Recommended for beginners - Free, Cloud-based, Real-time)
2. **cPanel MySQL Database** (For traditional hosting with server space)

---

## Option 1: Firebase (Recommended)

### Setup Steps:

1. **Create Firebase Account**
   - Go to [firebase.google.com](https://firebase.google.com)
   - Click "Get Started"
   - Sign in with Google account

2. **Create New Project**
   - Click "Create a project"
   - Name: `lebu-lonka-site`
   - Enable Google Analytics (optional)
   - Click "Create project"

3. **Setup Firestore Database**
   - Go to "Build" → "Firestore Database"
   - Click "Create Database"
   - Start in **Production Mode**
   - Choose region closest to you (e.g., `asia-south1` for India)
   - Click "Enable"

4. **Get Firebase Config**
   - Go to "Project Settings" (gear icon)
   - Click "Your apps"
   - Click "</>" to create web app
   - App nickname: `lebu-lonka-web`
   - Copy the config object

5. **Update Your Config**
   - Open `js/firebase-config.js`
   - Replace the empty `firebaseConfig` with your config:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

6. **Setup Firestore Rules**
   - Go to "Firestore Database" → "Rules"
   - Replace with this for public read/write (test mode):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /orders/{document=**} {
         allow read, write: if true;
       }
       match /customers/{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
   - For production, require authentication:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /orders/{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

7. **Activate in Code**
   - Open `js/firebase-config.js`
   - Uncomment the initialization code:
   ```javascript
   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   ```

### Firebase Collections Structure:

Create these collections in Firestore:

**Collection: `orders`**
```
Document ID: (auto-generated)
Fields:
  - id: number (timestamp)
  - timestamp: string (ISO date)
  - customer: {
      name: string
      email: string
      phone: string
      address: string
      notes: string
    }
  - items: array
  - subtotal: number
  - discount: number
  - deliveryCharges: number
  - total: number
  - paymentMethod: string (COD)
  - couponApplied: string (SAVE10)
  - status: string (Pending, Confirmed, Delivered)
```

**Collection: `customers`** (Optional - for customer profiles)
```
Document ID: (customer email)
Fields:
  - name: string
  - email: string
  - phone: string
  - totalOrders: number
  - createdDate: timestamp
```

### Firebase Features:
- ✅ Free tier: Up to 1 GB data, 50K reads/day
- ✅ Real-time database updates
- ✅ Automatic backups
- ✅ Easy to scale
- ✅ Authentication ready
- ✅ No server maintenance

---

## Option 2: cPanel MySQL Database

### What is cPanel?
cPanel is a hosting control panel for managing your website files and databases. You typically get it with shared hosting plans.

### Prerequisites:
- cPanel hosting account (from GoDaddy, Bluehost, HostGator, etc.)
- cPanel login credentials

### Step 1: Access cPanel

1. **Login to cPanel**
   - Go to `yourdomain.com:2083` or `yourdomain.com/cpanel`
   - Enter username & password
   - Click "Log in"

2. **Find MySQL Databases**
   - Look for "MySQL® Databases" or "Databases"
   - Click on it

### Step 2: Create Database

1. **Create New Database**
   - Click "Create New Database"
   - Database name: `lebulonka_db`
   - Click "Create Database"

2. **Create Database User**
   - Click "Create New User"
   - Username: `lebulonka_user`
   - Password: (strong password - save this!)
   - Click "Create User"

3. **Add User to Database**
   - Find your database and user
   - Click "Add User to Database"
   - Select user: `lebulonka_user`
   - Select database: `lebulonka_db`
   - Check all privileges
   - Click "Add"

### Step 3: Access phpMyAdmin

1. **Open phpMyAdmin**
   - In cPanel, click "phpMyAdmin"
   - Select your database from left sidebar

2. **Create Tables**
   
   **Table: `orders`**
   ```sql
   CREATE TABLE orders (
     id INT PRIMARY KEY AUTO_INCREMENT,
     order_id BIGINT NOT NULL,
     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
     customer_name VARCHAR(100),
     customer_email VARCHAR(100),
     customer_phone VARCHAR(20),
     customer_address TEXT,
     customer_notes TEXT,
     items JSON,
     subtotal DECIMAL(10, 2),
     discount DECIMAL(10, 2),
     delivery_charges DECIMAL(10, 2),
     total DECIMAL(10, 2),
     payment_method VARCHAR(50),
     coupon_applied VARCHAR(50),
     status VARCHAR(50) DEFAULT 'Pending',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

   **Table: `customers`**
   ```sql
   CREATE TABLE customers (
     id INT PRIMARY KEY AUTO_INCREMENT,
     email VARCHAR(100) UNIQUE,
     name VARCHAR(100),
     phone VARCHAR(20),
     total_orders INT DEFAULT 0,
     created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Step 4: Connect Website to cPanel Database

1. **Create PHP API File** (`api/save-order.php`)
   ```php
   <?php
   header('Content-Type: application/json');
   
   // Database connection
   $servername = "localhost";
   $username = "lebulonka_user";
   $password = "YOUR_PASSWORD";
   $dbname = "lebulonka_db";
   
   $conn = new mysqli($servername, $username, $password, $dbname);
   
   if ($conn->connect_error) {
       die(json_encode(['success' => false, 'error' => 'Connection failed']));
   }
   
   // Get POST data
   $data = json_decode(file_get_contents("php://input"), true);
   
   if ($data) {
       $order_id = $data['id'];
       $name = $conn->real_escape_string($data['customer']['name']);
       $email = $conn->real_escape_string($data['customer']['email']);
       $phone = $conn->real_escape_string($data['customer']['phone']);
       $address = $conn->real_escape_string($data['customer']['address']);
       $notes = $conn->real_escape_string($data['customer']['notes']);
       $items = json_encode($data['items']);
       $subtotal = $data['subtotal'];
       $discount = $data['discount'];
       $delivery = $data['deliveryCharges'];
       $total = $data['total'];
       $coupon = $data['couponApplied'];
       
       $sql = "INSERT INTO orders (order_id, customer_name, customer_email, customer_phone, customer_address, customer_notes, items, subtotal, discount, delivery_charges, total, coupon_applied) 
               VALUES ('$order_id', '$name', '$email', '$phone', '$address', '$notes', '$items', $subtotal, $discount, $delivery, $total, '$coupon')";
       
       if ($conn->query($sql) === TRUE) {
           echo json_encode(['success' => true, 'message' => 'Order saved']);
       } else {
           echo json_encode(['success' => false, 'error' => $conn->error]);
       }
   }
   
   $conn->close();
   ?>
   ```

2. **Update firebase-config.js**
   ```javascript
   // Add this function to save to your server
   async function saveOrderToDatabase(orderData) {
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
               console.log('Order saved to database');
           }
       } catch (error) {
           console.error('Error saving order:', error);
       }
   }
   ```

### Step 5: Manage Database in cPanel

**View Orders:**
1. Open phpMyAdmin
2. Select `orders` table
3. Click "Browse" to see all orders

**Search Orders:**
1. Click "Search" tab
2. Filter by customer_email or order_id

**Update Order Status:**
1. Click "Edit" on any order
2. Change status to "Confirmed", "Shipped", "Delivered"
3. Click "Go"

**Backup Database:**
1. In cPanel, find "Backups"
2. Or export from phpMyAdmin:
   - Select database
   - Click "Export"
   - Format: SQL
   - Download

### cPanel Features:
- ✅ Full control over data
- ✅ Unlimited storage (depends on plan)
- ✅ Easy backups
- ✅ Can integrate with email notifications
- ❌ Requires server maintenance
- ❌ Not real-time updates

---

## Recommended Setup: Hybrid Approach

**For Best Results:**
1. Use **Firebase** for real-time order notifications
2. Use **cPanel MySQL** as backup/archive
3. Both sync together

Update `submitOrder()` in `js/app.js`:
```javascript
function submitOrder(e) {
    e.preventDefault();

    const orderData = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        customer: {
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            phone: document.getElementById('customerPhone').value,
            address: document.getElementById('customerAddress').value,
            notes: document.getElementById('customerNotes').value
        },
        items: JSON.parse(JSON.stringify(cart)),
        subtotal: subtotal,
        discount: appliedCoupon ? (subtotal * 0.10) : 0,
        deliveryCharges: 0,
        total: total,
        paymentMethod: 'COD',
        couponApplied: appliedCoupon ? 'SAVE10' : null,
        status: 'Pending'
    };

    // Save to localStorage
    orders.push(orderData);
    localStorage.setItem('lebulonka_orders', JSON.stringify(orders));

    // Save to Firebase
    saveOrderToFirebase(orderData);

    // Save to cPanel MySQL (if available)
    saveOrderToDatabase(orderData);

    // Clear cart
    cart = [];
    localStorage.removeItem('lebulonka_cart');

    // Show success modal
    showSuccessModal(orderData);
}
```

---

## Comparison Table

| Feature | Firebase | cPanel MySQL |
|---------|----------|-------------|
| **Setup Difficulty** | Easy (5 min) | Moderate (15 min) |
| **Cost** | Free (up to limits) | Included with hosting |
| **Real-time** | ✅ Yes | ❌ No |
| **Scalability** | ✅ Excellent | ❌ Limited |
| **Backups** | ✅ Automatic | ⚠️ Manual |
| **Data Control** | ⚠️ Google Cloud | ✅ Your server |
| **Best For** | Startups, MVPs | Traditional businesses |

---

## Troubleshooting

### Firebase Issues:
- **"Permission denied" error** → Check Firestore security rules
- **Config not found** → Verify `firebaseConfig` in firebase-config.js
- **Data not saving** → Check browser console for errors

### cPanel Issues:
- **Can't connect to database** → Verify username/password
- **"Connection refused"** → Check if MySQL service is running
- **Large file upload fails** → Check cPanel upload limits

---

## Important Security Notes:

1. **Never expose your Firebase config in production**
   - Use environment variables
   - Set Firestore rules to require authentication

2. **Never commit database passwords**
   - Use `.env` file (add to .gitignore)
   - Use separate credentials per environment

3. **Validate all user inputs** server-side
   - Never trust client-side data
   - Sanitize strings in PHP

4. **Use HTTPS only**
   - All data transmission should be encrypted
   - cPanel provides free SSL certificates

---

## Quick Reference

**Firebase Setup:**
```
firebase.google.com → Create Project → Firestore → Copy Config → Update Code
```

**cPanel Setup:**
```
cPanel Login → MySQL Databases → Create DB & User → phpMyAdmin → Create Tables → API File
```

**Test Your Database:**
```
1. Place an order on website
2. Check Firebase Console or phpMyAdmin
3. Verify order appears in database
4. Test coupon code "SAVE10"
5. Check order total calculation
```

---

For questions, refer to:
- Firebase Docs: [firebase.google.com/docs](https://firebase.google.com/docs)
- cPanel Docs: [cpanel.net/tutorials](https://cpanel.net/tutorials)
- MySQL Docs: [mysql.com/doc](https://mysql.com/doc)
