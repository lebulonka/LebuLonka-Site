// ===== Products Database =====
// This file contains all product information for লেবু লঙ্কা
// Update products, prices, images, and descriptions here
// 
// Images: Upload any resolution (the CSS will automatically adjust & crop to fit)
// - Supports JPG, PNG, WebP, GIF
// - Place images in the /images folder
// - Reference them as: 'images/product-name.jpg'
// - If image path is empty or image fails to load, emoji will be shown as fallback

const products = [
    {
        id: 1,
        name: 'লেবু মরিচ চিপস',
        englishName: 'Lemon Chili Chips',
        price: 50,
        emoji: '🌶️',
        image: './product-images/1.jpg',
        description: 'Crispy chips with tangy lemon and spicy chili flavor'
    },
    {
        id: 2,
        name: 'আচারের স্বাদ',
        englishName: 'Pickle Mix',
        price: 60,
        emoji: '🥒',
        image: './product-images/2.jpg',
        description: 'Traditional Bengali pickle blend with authentic taste'
    },
    {
        id: 3,
        name: 'মরিচ লেবু মধু',
        englishName: 'Chili Lemon Honey',
        price: 65,
        emoji: '🍯',
        image: './product-images/3.jpg',
        description: 'Sweet and spicy honey blend with fresh lemon'
    },
    {
        id: 4,
        name: 'কাঁচা মরিচ আচার',
        englishName: 'Raw Chili Pickle',
        price: 55,
        emoji: '🌶️',
        image: 'images/raw-chili-pickle.jpg',
        description: 'Fresh raw green chili preserved in traditional spices'
    },
    {
        id: 5,
        name: 'লেবুর রস',
        englishName: 'Lemon Concentrate',
        price: 70,
        emoji: '🍋',
        image: 'images/lemon-concentrate.jpg',
        description: 'Pure concentrated lemon juice with natural flavor'
    },
    {
        id: 6,
        name: 'মরিচের গুঁড়া',
        englishName: 'Chili Powder',
        price: 45,
        emoji: '🌶️',
        image: 'images/chili-powder.jpg',
        description: 'Pure and spicy chili powder made from finest chilies'
    }
];

// Product management functions
function getProduct(id) {
    return products.find(product => product.id === id);
}

function getAllProducts() {
    return products;
}

function addProduct(product) {
    const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        ...product
    };
    products.push(newProduct);
    return newProduct;
}

function updateProduct(id, updates) {
    const product = products.find(p => p.id === id);
    if (product) {
        Object.assign(product, updates);
        return product;
    }
    return null;
}

function deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);
    if (index > -1) {
        return products.splice(index, 1)[0];
    }
    return null;
}

// Export products for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, getProduct, getAllProducts, addProduct, updateProduct, deleteProduct };
}
