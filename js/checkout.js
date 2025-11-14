// ===== Checkout Page Logic =====

let checkoutCart = [];
let appliedCoupon = null;

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutCart();
    displayCartItems();
    calculateTotals();
});

// Load cart from localStorage
function loadCheckoutCart() {
    const savedCart = localStorage.getItem('lebulonka_cart');
    if (savedCart) {
        checkoutCart = JSON.parse(savedCart);
    }
}

// Display cart items in summary
function displayCartItems() {
    const cartItemsSummary = document.getElementById('cartItemsSummary');
    
    if (checkoutCart.length === 0) {
        cartItemsSummary.innerHTML = '<div class="cart-empty-message">Your cart is empty. <a href="index.html">Add items to continue</a></div>';
        return;
    }

    let itemsHTML = '';
    checkoutCart.forEach(item => {
        itemsHTML += `
            <div class="summary-item">
                <span class="summary-item-name">${item.name}</span>
                <span class="summary-item-qty">x${item.quantity}</span>
                <span class="summary-item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });

    cartItemsSummary.innerHTML = itemsHTML;
}

// Calculate and display totals
function calculateTotals() {
    // Calculate subtotal
    const subtotal = checkoutCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Delivery charges (always FREE)
    const deliveryCharges = 0;
    
    // Calculate discount
    let discount = 0;
    if (appliedCoupon) {
        discount = (subtotal * appliedCoupon.discount) / 100;
    }
    
    // Calculate total
    const total = subtotal - discount + deliveryCharges;
    
    // Update UI
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('deliveryCharges').textContent = 'FREE';
    document.getElementById('totalAmount').textContent = `₹${total.toFixed(2)}`;
    
    // Show/hide discount row
    const discountRow = document.getElementById('discountRow');
    if (discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('discountAmount').textContent = `-₹${discount.toFixed(2)}`;
    } else {
        discountRow.style.display = 'none';
        appliedCoupon = null;
    }
}

// Apply coupon code
function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value.toUpperCase().trim();
    const couponMessage = document.getElementById('couponMessage');
    
    if (!couponCode) {
        couponMessage.textContent = 'Please enter a coupon code';
        couponMessage.className = 'coupon-message error';
        return;
    }
    
    // Get current cart total
    const cartTotal = checkoutCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Validate coupon with cart value check
    const validation = applyCouponWithValidation(couponCode, cartTotal);
    
    if (validation.valid) {
        appliedCoupon = { 
            code: validation.coupon.code, 
            discount: validation.coupon.discountPercentage 
        };
        couponMessage.textContent = validation.message;
        couponMessage.className = 'coupon-message success';
        document.getElementById('couponCode').value = '';
        calculateTotals();
    } else {
        couponMessage.textContent = validation.message;
        couponMessage.className = 'coupon-message error';
        appliedCoupon = null;
        calculateTotals();
    }
}

// Submit checkout form
function submitCheckoutForm() {
    console.log('=== PLACE ORDER CLICKED ===');
    console.log('checkoutCart length:', checkoutCart.length);
    
    const form = document.getElementById('checkoutFormPage');
    console.log('Form element:', form);
    
    if (!form) {
        console.error('Form not found!');
        return;
    }
    
    console.log('Form found. Checking validity...');
    if (!form.checkValidity()) {
        console.log('Form validation failed');
        form.reportValidity();
        return;
    }
    
    console.log('Form is valid. Checking cart...');
    if (checkoutCart.length === 0) {
        console.warn('Cart is empty');
        return;
    }
    
    console.log('✓ All checks passed. Processing order with', checkoutCart.length, 'items');
    
    // Calculate final total
    const subtotal = checkoutCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let total = subtotal;
    let discountAmount = 0;
    
    if (appliedCoupon) {
        discountAmount = (subtotal * appliedCoupon.discount) / 100;
        total = subtotal - discountAmount;
    }
    
    // Create order data
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
        items: JSON.parse(JSON.stringify(checkoutCart)),
        subtotal: subtotal,
        discount: discountAmount,
        deliveryCharges: 0,
        total: total,
        paymentMethod: 'COD',
        couponApplied: appliedCoupon ? 'SAVE10' : null,
        status: 'Pending'
    };
    
    console.log('✓ Order data created:', orderData);
    
    // Save to localStorage
    let orders = JSON.parse(localStorage.getItem('lebulonka_orders')) || [];
    orders.push(orderData);
    localStorage.setItem('lebulonka_orders', JSON.stringify(orders));
    console.log('✓ Saved to localStorage');
    
    // Save to Firebase (if configured)
    console.log('Saving to Firebase...');
    saveOrderToFirebase(orderData);
    
    // Send confirmation emails
    console.log('📧 Initiating email notifications...');
    sendOrderEmails(orderData).then(emailsSent => {
        if (emailsSent) {
            console.log('✓ Confirmation emails sent!');
        } else {
            console.log('⚠️ Email sending queued for retry');
        }
    });
    
    // Clear cart
    checkoutCart = [];
    localStorage.removeItem('lebulonka_cart');
    
    // Show success modal
    console.log('✓ Showing success modal');
    showSuccessModalCheckout(orderData);
    
    // Clear form
    form.reset();
}

// Show success modal
function showSuccessModalCheckout(orderData) {
    const successModal = document.getElementById('successModal');
    const successMessage = document.getElementById('successMessage');
    const successOrderId = document.getElementById('successOrderId');
    const successTotal = document.getElementById('successTotal');
    
    console.log('Modal element:', successModal);
    
    if (!successModal) {
        console.error('Success modal element not found!');
        return;
    }
    
    if (successMessage) {
        successMessage.textContent = `Thank you for your order! We'll contact you shortly to confirm the delivery details.`;
    }
    if (successOrderId) {
        successOrderId.innerHTML = `<strong>Order ID:</strong> #${orderData.id}`;
    }
    if (successTotal) {
        successTotal.innerHTML = `<strong>Total Amount:</strong> ₹${orderData.total.toFixed(2)}`;
    }
    
    console.log('Adding active class to modal');
    successModal.classList.add('active');
    console.log('Modal classes:', successModal.className);
}

// Go home (from success modal)
function goHome() {
    window.location.href = 'index.html';
}

// Go back to products
function goBack() {
    // Use history.back() if available, otherwise go to index.html
    if (history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// Firebase function - Save order to Firestore using REST API
function saveOrderToFirebase(orderData) {
    console.log('Attempting to save to Firebase REST API...');
    
    // Call the REST API function from firebase-config.js
    saveOrderToFirestoreREST(orderData)
        .then((docId) => {
            console.log('✓ Order saved to Firebase successfully!');
            // Update localStorage with Firebase document ID for reference
            orderData.firebaseId = docId;
            let orders = JSON.parse(localStorage.getItem('lebulonka_orders')) || [];
            orders[orders.length - 1].firebaseId = docId;
            localStorage.setItem('lebulonka_orders', JSON.stringify(orders));
        })
        .catch((error) => {
            console.error('Firebase save error:', error.message);
            console.log('✓ Order saved locally as backup!');
        });
}
