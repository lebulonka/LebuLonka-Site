# 🎟️ COUPON SYSTEM - QUICK REFERENCE

## What Changed

✅ **New File**: `js/coupons.js` - Centralized coupon management
✅ **Updated**: `checkout.html` - Removed suggested coupon section  
✅ **Updated**: `js/checkout.js` - New validation using coupons.js
✅ **Updated**: `js/app.js` - Removed all alert popups
✅ **Updated**: `index.html` - Added coupons.js script tag

---

## How to Configure Coupons

Edit `js/coupons.js` and modify the `coupons` array:

```javascript
const coupons = [
    {
        code: 'SAVE10',                    // Coupon code (uppercase)
        discountPercentage: 10,            // Discount % (0-100)
        minCartValue: 100,                 // Min cart amount required
        expiry: null,                      // null = never expires
        description: '10% off...'          // User-friendly description
    },
    {
        code: 'WELCOME20',
        discountPercentage: 20,
        minCartValue: 500,
        expiry: '2025-12-31',              // Format: YYYY-MM-DD
        description: '20% off on first order'
    }
];
```

---

## Current Coupons

| Code | Discount | Min Cart | Expiry | Status |
|------|----------|----------|--------|--------|
| SAVE10 | 10% | ₹100 | Never | ✅ Active |
| WELCOME20 | 20% | ₹500 | 2025-12-31 | ✅ Active |
| BENGALI25 | 25% | ₹1000 | Never | ✅ Active |

---

## How Coupons Work

### When Customer Applies Coupon:

1. **Code entered** in checkout
2. **Validation** checks:
   - ✓ Code exists
   - ✓ Not expired
   - ✓ Cart value ≥ minimum
3. **If valid**: Discount applied, success message shown
4. **If invalid**: Error message shown, no discount applied

### Example Flow:

```
Customer has ₹450 cart
Tries code: WELCOME20
System checks:
├─ Code exists? YES ✓
├─ Expired? NO (valid until 2025-12-31) ✓
└─ Cart ≥ ₹500? NO ✗
Result: "Minimum order value ₹500 required (Current: ₹450)"
```

---

## Key Features

✅ **Never-Expiring Coupons**: Set `expiry: null`
✅ **Time-Limited Coupons**: Set `expiry: 'YYYY-MM-DD'`
✅ **Minimum Cart Value**: Enforce spending limits
✅ **Flexible Discounts**: Any percentage (1-100%)
✅ **No Hard-Coded Coupons**: Easy to add/remove/modify
✅ **Clear Error Messages**: Users know exactly why coupon failed

---

## Removed Features

❌ **Alert popups** - All replaced with clean UI messages
❌ **Hard-coded coupons** - Now in separate file
❌ **Suggested coupons** - Removed from checkout page
❌ **Fixed discounts** - Dynamic percentage support

---

## Adding New Coupons

1. Open `js/coupons.js`
2. Add to the `coupons` array:

```javascript
{
    code: 'NEWYEAR30',
    discountPercentage: 30,
    minCartValue: 800,
    expiry: '2026-01-31',
    description: '30% off New Year special'
}
```

3. Save and refresh website
4. ✅ New coupon works immediately!

---

## Removing Coupons

1. Open `js/coupons.js`
2. Remove the coupon object from array
3. Save and refresh
4. ✅ Coupon no longer works

---

## Functions Available

```javascript
// Validate coupon (basic check)
validateCoupon('SAVE10')
// Returns: { valid: true/false, message: string }

// Validate with cart value check (recommended)
applyCouponWithValidation('SAVE10', cartTotal)
// Returns: { valid: true/false, message: string, coupon: obj, discount: amount }

// Get all currently valid coupons
getValidCoupons()
// Returns: array of non-expired coupons

// Get info about specific coupon
getCouponInfo('SAVE10')
// Returns: coupon object or undefined
```

---

## User Experience

### Before (Old Way)
```
User tries coupon
Browser shows: alert("Invalid coupon")
Bad UX ✗
```

### After (New Way)
```
User tries coupon
UI shows: "✗ Coupon has expired" (or specific error)
Clean UX ✓
```

---

## Examples to Try

```
SAVE10      → Works on ₹100+ orders
WELCOME20   → Works on ₹500+ orders (until Dec 31, 2025)
BENGALI25   → Works on ₹1000+ orders
INVALID     → Shows: "✗ Invalid coupon code"
```

---

## Validation Rules

```javascript
Coupon is valid if:
  ✓ Code matches (case-insensitive)
  ✓ Expiry is null OR expiry date ≥ today
  ✓ Cart total ≥ minCartValue

If any check fails → Error message to user
```

---

## Notes

- Coupon codes are case-insensitive (save10 = SAVE10)
- Whitespace is trimmed automatically
- Only one coupon per order (last applied wins)
- Discounts are calculated as: (cartTotal × discountPercentage) / 100

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Coupon won't apply | Check minCartValue is met |
| Expired coupon won't work | Check expiry date in coupons.js |
| Code not recognized | Verify exact spelling in coupons.js |
| Wrong discount amount | Check discountPercentage value |

---

**Setup Complete!** 🎟️ Your coupon system is ready to use!
