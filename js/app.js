// ===== Global Variables =====
let cart = JSON.parse(localStorage.getItem('lebulonka_cart')) || [];
let productsArray = [];
let orders = [];

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    productsArray = products; // Import from products.js
    renderProducts();
    setupEventListeners();
    updateCartDisplay();
    loadOrdersFromFirebase();
    displayRandomReviews('reviewsContainer', 3); // Load 3 random reviews
}


// ===== Setup Event Listeners =====
function setupEventListeners() {
    // Cart Icon
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    document.getElementById('checkoutBtn').addEventListener('click', openCheckout);

    // Modal
    document.querySelector('.modal-close').addEventListener('click', closeCheckout);
    document.getElementById('checkoutForm').addEventListener('submit', submitOrder);

    // Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            closeCart();
        });
    });

    // Contact Form
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! We will contact you soon.');
        this.reset();
    });

    // Cart Overlay Close - Click anywhere outside cart sidebar
    document.addEventListener('click', function(e) {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartBtn = document.getElementById('cartBtn');
        const isCartOpen = cartSidebar.classList.contains('active');
        
        // If cart is open and click is NOT on cart sidebar and NOT on cart button
        if (isCartOpen && !cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
            closeCart();
        }
    });

    // Modal Checkout Close
    document.getElementById('checkoutModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCheckout();
        }
    });
}

// ===== Render Products =====
function renderProducts() {
    const productsList = document.getElementById('productsList');
    
    // Only render if products list is empty (initial load)
    if (productsList.children.length === 0) {
        productsList.innerHTML = '';

        productsArray.forEach(product => {
            const cartItem = cart.find(item => item.id === product.id);
            const isInCart = cartItem && cartItem.quantity > 0;
            const quantity = cartItem ? cartItem.quantity : 0;

            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.id = `product-${product.id}`;
            
            // Check if product has an image or use emoji fallback
            const imageHTML = product.image && product.image.trim() !== '' 
                ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">` 
                : '';
            const fallbackEmoji = imageHTML ? `<span class="product-image-fallback" style="display:none;">${product.emoji}</span>` : `<span class="product-image-fallback">${product.emoji}</span>`;
            
            productCard.innerHTML = `
                <div class="product-image">
                    ${imageHTML}
                    ${fallbackEmoji}
                </div>
                <div class="product-content">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">₹${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    <div class="product-controls">
                        <div class="quantity-control" id="qty-control-${product.id}" style="display: ${isInCart ? 'flex' : 'none'};">
                            <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">−</button>
                            <input type="number" class="quantity-input" value="${quantity}" readonly>
                            <button class="quantity-btn" onclick="increaseQuantity(${product.id})">+</button>
                        </div>
                        <button class="add-to-cart-btn" id="btn-${product.id}" onclick="addToCart(${product.id})" style="display: ${isInCart ? 'none' : 'block'};">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
            productsList.appendChild(productCard);
        });
    } else {
        // Update only the product card controls without re-rendering
        updateProductCard(null);
    }
}

// ===== Update Single Product Card =====
function updateProductCard(productId) {
    if (productId === null) {
        // Update all product cards
        productsArray.forEach(product => {
            updateProductCard(product.id);
        });
        return;
    }

    const productCard = document.getElementById(`product-${productId}`);
    if (!productCard) return;

    const cartItem = cart.find(item => item.id === productId);
    const quantity = cartItem ? cartItem.quantity : 0;
    const isInCart = quantity > 0;

    // Update quantity input
    const quantityInput = productCard.querySelector('.quantity-input');
    if (quantityInput) {
        quantityInput.value = quantity;
    }

    // Toggle visibility of quantity control and button
    const qtyControl = document.getElementById(`qty-control-${productId}`);
    const addBtn = document.getElementById(`btn-${productId}`);
    
    if (qtyControl) {
        qtyControl.style.display = isInCart ? 'flex' : 'none';
    }
    
    if (addBtn) {
        addBtn.style.display = isInCart ? 'none' : 'block';
    }
}

// ===== Cart Functions =====
function addToCart(productId) {
    const product = productsArray.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    updateProductCard(productId);
    showNotification('Product added to cart!');
    
    // Auto-open cart when adding item
    setTimeout(() => {
        document.getElementById('cartSidebar').classList.add('active');
        document.body.classList.add('cart-open');
    }, 100);
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        saveCart();
        updateCartDisplay();
        updateProductCard(productId);
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
            saveCart();
            updateCartDisplay();
            updateProductCard(productId);
        } else {
            removeFromCart(productId);
            return;
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    updateProductCard(productId);
    showNotification('Product removed from cart!');
}

function saveCart() {
    localStorage.setItem('lebulonka_cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // If cart is empty
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">কার্ট খালি</p>';
        checkoutBtn.disabled = true;
    } else {
        // Check if this is the first time rendering cart items
        if (cartItems.children.length === 0 || cartItems.querySelector('.empty-cart')) {
            // Full render on first load
            cartItems.innerHTML = cart.map(item => {
                const product = getProduct(item.id);
                const imageUrl = product && product.image ? product.image : '';
                const imageStyle = imageUrl ? `background-image: url('${imageUrl}'); background-size: cover; background-position: center;` : '';
                return `
                <div class="cart-item" id="cart-item-${item.id}">
                    <div class="cart-item-image" style="${imageStyle}">${!imageUrl ? item.emoji : ''}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price} × <span class="qty-display">${item.quantity}</span></div>
                        <div class="cart-item-controls">
                            <button class="cart-qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                            <button class="cart-qty-btn" onclick="decreaseQuantity(${item.id})">−</button>
                            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `}).join('');
        } else {
            // Update existing items without full re-render
            cart.forEach(item => {
                updateCartItem(item);
            });
            
            // Remove items that are no longer in cart
            document.querySelectorAll('.cart-item').forEach(el => {
                const itemId = parseInt(el.id.replace('cart-item-', ''));
                if (!cart.find(item => item.id === itemId)) {
                    el.remove();
                }
            });
        }
        checkoutBtn.disabled = false;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = '₹' + total;
}

// ===== Update Single Cart Item =====
function updateCartItem(item) {
    const cartItemEl = document.getElementById(`cart-item-${item.id}`);
    
    if (!cartItemEl) {
        // Item doesn't exist, add it with animation
        const cartItems = document.getElementById('cartItems');
        const newItem = document.createElement('div');
        newItem.className = 'cart-item';
        newItem.id = `cart-item-${item.id}`;
        
        const product = getProduct(item.id);
        const imageUrl = product && product.image ? product.image : '';
        const imageStyle = imageUrl ? `background-image: url('${imageUrl}'); background-size: cover; background-position: center;` : '';
        
        newItem.innerHTML = `
            <div class="cart-item-image" style="${imageStyle}">${!imageUrl ? item.emoji : ''}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} × <span class="qty-display">${item.quantity}</span></div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                    <button class="cart-qty-btn" onclick="decreaseQuantity(${item.id})">−</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(newItem);
        return;
    }

    // Update only the quantity display
    const qtyDisplay = cartItemEl.querySelector('.qty-display');
    if (qtyDisplay) {
        qtyDisplay.textContent = item.quantity;
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    document.body.classList.toggle('cart-open');
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.remove('active');
    document.body.classList.remove('cart-open');
}

// ===== Checkout Functions =====
function openCheckout() {
    if (cart.length === 0) {
        return;
    }

    // Close cart overlay first
    closeCart();
    
    // Navigate to checkout page
    window.location.href = 'checkout.html';
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}


function renderOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        </div>
    `).join('');

    orderTotal.textContent = total;
}

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
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        discount: 0,
        deliveryCharges: 0,
        paymentMethod: 'COD',
        couponApplied: null,
        status: 'Pending'
    };

    // Save to localStorage
    orders.push(orderData);
    localStorage.setItem('lebulonka_orders', JSON.stringify(orders));

    // Save to Firebase (if configured)
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

    // Clear cart and form
    cart = [];
    saveCart();
    updateCartDisplay();
    document.getElementById('checkoutForm').reset();
    closeCheckout();

    // Show success modal
    showSuccessModal(orderData);
    renderProducts();
}

// ===== Firebase Functions =====
function saveOrderToFirebase(orderData) {
    console.log('Attempting to save to Firebase REST API from home page...');
    
    // Call the REST API function from firebase-config.js
    saveOrderToFirestoreREST(orderData)
        .then((docId) => {
            console.log('✓ Order saved to Firebase!');
            showNotification('✓ Order saved to Firebase!');
            // Update localStorage with Firebase document ID
            orderData.firebaseId = docId;
            let orders = JSON.parse(localStorage.getItem('lebulonka_orders')) || [];
            orders[orders.length - 1].firebaseId = docId;
            localStorage.setItem('lebulonka_orders', JSON.stringify(orders));
        })
        .catch((error) => {
            console.error('Firebase save error:', error.message);
            showNotification('✓ Order saved locally!');
        });
}

function loadOrdersFromFirebase() {
    // Load orders from localStorage for now (Firebase read can be added later for admin dashboard)
    const savedOrders = localStorage.getItem('lebulonka_orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

// ===== Utility Functions =====
function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00A86B;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Success Modal Functions =====
function showSuccessModal(orderData) {
    const successModal = document.getElementById('successModal');
    const successMessage = document.getElementById('successMessage');
    const successOrderId = document.getElementById('successOrderId');
    const successTotal = document.getElementById('successTotal');

    // Populate success modal with order details
    successMessage.textContent = `Your order has been placed successfully! We'll contact you shortly to confirm the delivery details.`;
    successOrderId.innerHTML = `<strong>Order ID:</strong> #${orderData.id}`;
    successTotal.innerHTML = `<strong>Total Amount:</strong> ₹${orderData.total.toFixed(2)}`;

    // Show the success modal
    successModal.classList.add('active');
}

function closeSuccess() {
    const successModal = document.getElementById('successModal');
    successModal.classList.remove('active');
    
    // Reset to products view
    renderProducts();
}
