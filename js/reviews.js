// ===== Reviews Configuration =====
// Each review has: name, text, rating (1-5), date (YYYY-MM-DD)

const reviews = [
    {
        name: 'Subham Dutta Roy',
        text: 'অসাধারণ পণ্য এবং দ্রুত ডেলিভারি। আমি খুবই সন্তুষ্ট এবং আবার কিনব নিশ্চিত।',
        rating: 5,
        date: '2025-11-10'
    },
    {
        name: 'Aryan Roy',
        text: 'মানসম্পন্ন পণ্য এবং অসাধারণ কাস্টমার সার্ভিস। সবাইকে সুপারিশ করি।',
        rating: 5,
        date: '2025-11-08'
    },
    {
        name: 'Pratik Chakraborty',
        text: 'পণ্যের গুণমান ভালো কিন্তু ডেলিভারি একটু দেরি হয়েছে। সামগ্রিকভাবে সন্তুষ্ট।',
        rating: 4,
        date: '2025-11-05'
    },
    {
        name: 'Deep Sarkar',
        text: 'লেবু লংকা থেকে কেনাকাটা সবসময় নির্ভরযোগ্য। এই বার আমার প্রত্যাশা অতিক্রম করেছে।',
        rating: 5,
        date: '2025-11-03'
    },
    {
        name: 'Abhishek Mukherjee',
        text: 'দামও ভালো এবং পণ্যও ভালো। এটি আমার প্রিয় অনলাইন স্টোর।',
        rating: 5,
        date: '2025-10-28'
    }
];

// ===== Review Functions =====

/**
 * Get all reviews
 */
function getAllReviews() {
    return reviews;
}

/**
 * Get a specific number of random reviews
 * @param {number} count - Number of reviews to return (default: 3)
 */
function getRandomReviews(count = 3) {
    if (reviews.length <= count) {
        return [...reviews];
    }
    
    const shuffled = [...reviews].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/**
 * Add a new review
 * @param {object} review - Review object with name, text, rating, date
 */
function addReview(review) {
    if (!review.name || !review.text || !review.rating || !review.date) {
        console.error('Invalid review: missing required fields');
        return false;
    }
    
    if (review.rating < 1 || review.rating > 5) {
        console.error('Invalid rating: must be between 1 and 5');
        return false;
    }
    
    reviews.push(review);
    console.log('Review added successfully:', review);
    return true;
}

/**
 * Remove a review by name
 * @param {string} name - Customer name
 */
function removeReview(name) {
    const index = reviews.findIndex(r => r.name === name);
    if (index > -1) {
        reviews.splice(index, 1);
        console.log('Review removed:', name);
        return true;
    }
    console.error('Review not found:', name);
    return false;
}

/**
 * Get reviews with a specific rating
 * @param {number} rating - Star rating (1-5)
 */
function getReviewsByRating(rating) {
    return reviews.filter(r => r.rating === rating);
}

/**
 * Get average rating
 */
function getAverageRating() {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, r) => total + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
}

/**
 * Create HTML for a single review card
 * @param {object} review - Review object
 */
function createReviewCard(review) {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    return `
        <div class="review-card">
            <div class="review-header">
                <div class="review-name">${review.name}</div>
                <div class="review-date">${review.date}</div>
            </div>
            <div class="review-rating">${stars}</div>
            <div class="review-text">${review.text}</div>
        </div>
    `;
}

/**
 * Display random reviews on the page
 * @param {string} containerId - ID of container element
 * @param {number} count - Number of reviews to show (default: 3)
 */
function displayRandomReviews(containerId, count = 3) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
    }
    
    const randomReviews = getRandomReviews(count);
    const reviewsHTML = randomReviews.map(review => createReviewCard(review)).join('');
    
    container.innerHTML = reviewsHTML;
    console.log(`Displayed ${randomReviews.length} reviews in ${containerId}`);
}
