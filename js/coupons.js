// ===== Coupons Database =====
// Configure your coupons here
// expiry: null = never expires, or date string "YYYY-MM-DD"
// discountPercentage: 0-100
// minCartValue: minimum cart value to apply coupon

const coupons = [
    {
        code: 'SORRY100',
        discountPercentage: 100,
        minCartValue: 0,
        expiry: null, // Never expires
        description: '100% off as an apology'
    },
    {
        code: 'WELCOME20',
        discountPercentage: 20,
        minCartValue: 500,
        expiry: '2025-12-31',
        description: '20% off on first order above ₹500'
    },
    {
        code: 'BENGALI25',
        discountPercentage: 25,
        minCartValue: 1000,
        expiry: null, // Never expires
        description: '25% off on orders above ₹1000'
    }
];

// ===== Coupon Validation Function =====
function validateCoupon(couponCode) {
    const code = couponCode.toUpperCase().trim();
    
    // Find coupon
    const coupon = coupons.find(c => c.code === code);
    
    if (!coupon) {
        return {
            valid: false,
            message: '✗ Invalid coupon code'
        };
    }
    
    // Check expiry
    if (coupon.expiry) {
        const expiryDate = new Date(coupon.expiry);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (today > expiryDate) {
            return {
                valid: false,
                message: '✗ Coupon has expired'
            };
        }
    }
    
    return {
        valid: true,
        message: `✓ Coupon applied! ${coupon.discountPercentage}% off`,
        coupon: coupon
    };
}

// ===== Apply Coupon with Cart Value Check =====
function applyCouponWithValidation(couponCode, cartTotal) {
    const validation = validateCoupon(couponCode);
    
    if (!validation.valid) {
        return {
            valid: false,
            message: validation.message
        };
    }
    
    const coupon = validation.coupon;
    
    // Check minimum cart value
    if (cartTotal < coupon.minCartValue) {
        return {
            valid: false,
            message: `✗ Minimum order value ₹${coupon.minCartValue} required (Current: ₹${cartTotal})`
        };
    }
    
    return {
        valid: true,
        message: validation.message,
        coupon: coupon,
        discount: (cartTotal * coupon.discountPercentage) / 100
    };
}

// ===== Get All Valid Coupons =====
function getValidCoupons() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return coupons.filter(coupon => {
        if (!coupon.expiry) return true;
        return new Date(coupon.expiry) >= today;
    });
}

// ===== Get Coupon Info =====
function getCouponInfo(couponCode) {
    const code = couponCode.toUpperCase().trim();
    return coupons.find(c => c.code === code);
}
