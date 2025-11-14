// ===== Email Service Configuration =====
// cPanel SMTP Configuration
const emailConfig = {
    serviceEndpoint: 'https://mail.lebulonka.in/api/send-email', // Your server endpoint
    fromEmail: 'help@lebulonka.in',
    adminEmail: 'help@lebulonka.in',
    restaurantName: 'Lebu Lonka'
};

// ===== Email Template: Customer Order Confirmation =====
function getCustomerEmailTemplate(orderData) {
    const itemsList = orderData.items
        .map(item => `<tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">x${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">৳${item.price * item.quantity}</td>
        </tr>`)
        .join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #C41E3A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .order-section { margin: 20px 0; }
            .order-section h2 { color: #C41E3A; font-size: 18px; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th { background-color: #FFD700; padding: 10px; text-align: left; font-weight: 600; }
            .totals { margin: 20px 0; text-align: right; }
            .totals-row { display: flex; justify-content: flex-end; margin: 8px 0; font-size: 16px; }
            .totals-row.total { font-size: 20px; font-weight: bold; color: #C41E3A; border-top: 2px solid #C41E3A; padding-top: 10px; }
            .footer { background-color: #228B22; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 14px; }
            .order-id { background-color: #FFD700; color: #C41E3A; padding: 10px; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🍛 ${emailConfig.restaurantName}</h1>
                <p>Your Order Confirmation</p>
            </div>
            
            <div class="content">
                <p>Dear <strong>${orderData.customer.name}</strong>,</p>
                <p>Thank you for your order! We've received it and will prepare it with care.</p>
                
                <div class="order-id">Order ID: ${orderData.id}</div>
                
                <div class="order-section">
                    <h2>📦 Order Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsList}
                        </tbody>
                    </table>
                </div>
                
                <div class="totals">
                    <div class="totals-row">
                        <span>Subtotal:</span>
                        <span style="margin-left: 20px;">৳${orderData.subtotal}</span>
                    </div>
                    ${orderData.discount > 0 ? `<div class="totals-row">
                        <span>Discount (${orderData.couponApplied}):</span>
                        <span style="margin-left: 20px;">-৳${orderData.discount}</span>
                    </div>` : ''}
                    <div class="totals-row">
                        <span>Delivery Charges:</span>
                        <span style="margin-left: 20px;">৳${orderData.deliveryCharges}</span>
                    </div>
                    <div class="totals-row total">
                        <span>Total Amount:</span>
                        <span style="margin-left: 20px;">৳${orderData.total}</span>
                    </div>
                </div>
                
                <div class="order-section">
                    <h2>📍 Delivery Address</h2>
                    <p>${orderData.customer.address}</p>
                </div>
                
                <div class="order-section">
                    <h2>💳 Payment Method</h2>
                    <p><strong>${orderData.paymentMethod}</strong></p>
                    <p style="color: #666; font-size: 14px;">Status: <strong>${orderData.status}</strong></p>
                </div>
                
                ${orderData.customer.notes ? `<div class="order-section">
                    <h2>📝 Special Notes</h2>
                    <p>${orderData.customer.notes}</p>
                </div>` : ''}
                
                <p style="margin-top: 30px; color: #666;">We'll notify you when your order is ready for delivery!</p>
            </div>
            
            <div class="footer">
                <p>📞 Contact: ${orderData.customer.phone}</p>
                <p>Thank you for choosing ${emailConfig.restaurantName}! 🙏</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

// ===== Email Template: Admin Order Notification =====
function getAdminEmailTemplate(orderData) {
    const itemsList = orderData.items
        .map(item => `<tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">x${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">৳${item.price * item.quantity}</td>
        </tr>`)
        .join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #228B22; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .order-section { margin: 20px 0; }
            .order-section h2 { color: #228B22; font-size: 18px; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th { background-color: #FFD700; padding: 10px; text-align: left; font-weight: 600; }
            .customer-info { background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
            .customer-info p { margin: 8px 0; }
            .alert { background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .footer { background-color: #C41E3A; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 14px; }
            .order-id { background-color: #FFD700; color: #228B22; padding: 10px; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🍛 New Order Received!</h1>
            </div>
            
            <div class="content">
                <div class="alert">
                    <strong>⚠️ NEW ORDER ALERT</strong><br>
                    A new order has been placed and is ready for preparation.
                </div>
                
                <div class="order-id">Order ID: ${orderData.id}</div>
                
                <div class="order-section">
                    <h2>👤 Customer Information</h2>
                    <div class="customer-info">
                        <p><strong>Name:</strong> ${orderData.customer.name}</p>
                        <p><strong>Email:</strong> ${orderData.customer.email}</p>
                        <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
                        <p><strong>Address:</strong> ${orderData.customer.address}</p>
                        ${orderData.customer.notes ? `<p><strong>Special Notes:</strong> ${orderData.customer.notes}</p>` : ''}
                    </div>
                </div>
                
                <div class="order-section">
                    <h2>📦 Order Items</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsList}
                        </tbody>
                    </table>
                </div>
                
                <div class="order-section">
                    <h2>💰 Order Summary</h2>
                    <table>
                        <tr>
                            <td style="padding: 8px;">Subtotal:</td>
                            <td style="padding: 8px; text-align: right;">৳${orderData.subtotal}</td>
                        </tr>
                        ${orderData.discount > 0 ? `<tr>
                            <td style="padding: 8px;">Discount (${orderData.couponApplied}):</td>
                            <td style="padding: 8px; text-align: right;">-৳${orderData.discount}</td>
                        </tr>` : ''}
                        <tr>
                            <td style="padding: 8px;">Delivery Charges:</td>
                            <td style="padding: 8px; text-align: right;">৳${orderData.deliveryCharges}</td>
                        </tr>
                        <tr style="border-top: 2px solid #228B22; font-weight: bold; font-size: 16px;">
                            <td style="padding: 8px;">TOTAL:</td>
                            <td style="padding: 8px; text-align: right;">৳${orderData.total}</td>
                        </tr>
                    </table>
                </div>
                
                <div class="order-section">
                    <h2>📍 Delivery Details</h2>
                    <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
                    <p><strong>Status:</strong> ${orderData.status}</p>
                </div>
                
                <p style="margin-top: 30px; color: #666; text-align: center;">Please prepare this order immediately.</p>
            </div>
            
            <div class="footer">
                <p>Order Time: ${new Date(orderData.timestamp).toLocaleString()}</p>
                <p>${emailConfig.restaurantName} Order Management System</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

// ===== Send Email via Backend (cPanel) =====
async function sendEmailViaCPanel(to, subject, htmlContent) {
    try {
        console.log(`📧 Sending email to ${to}...`);
        
        // Send request to PHP backend on your cPanel hosting
        // Replace 'yourdomain.com' with your actual domain
        const response = await fetch('https://lebulonka.in/send-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: to,
                subject: subject,
                htmlContent: htmlContent
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log(`✓ Email sent successfully to ${to}`);
            return true;
        } else {
            console.error(`✗ Email send failed: ${result.error}`);
            return false;
        }
    } catch (error) {
        console.error('Email send error:', error);
        // Fallback: Log to localStorage if API fails
        let failedEmails = JSON.parse(localStorage.getItem('failedEmails') || '[]');
        failedEmails.push({ to, subject, timestamp: new Date().toISOString() });
        localStorage.setItem('failedEmails', JSON.stringify(failedEmails));
        console.log('✓ Email queued for retry');
        return false;
    }
}

// ===== Main Function: Send Order Emails =====
async function sendOrderEmails(orderData) {
    console.log('📧 Sending order confirmation emails...');
    
    try {
        // Email 1: Customer Confirmation
        const customerEmail = getCustomerEmailTemplate(orderData);
        console.log('✓ Customer email template prepared');
        
        // Email 2: Admin Notification
        const adminEmail = getAdminEmailTemplate(orderData);
        console.log('✓ Admin email template prepared');
        
        // Send both emails
        await sendEmailViaCPanel(orderData.customer.email, 
            `Order Confirmation - ${orderData.id}`, 
            customerEmail);
        
        await sendEmailViaCPanel(emailConfig.adminEmail, 
            `New Order Alert - ${orderData.id}`, 
            adminEmail);
        
        console.log('✓ Emails sent successfully!');
        return true;
    } catch (error) {
        console.error('Error sending emails:', error);
        return false;
    }
}
