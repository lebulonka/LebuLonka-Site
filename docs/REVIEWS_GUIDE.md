# Reviews System Guide

## Overview
The reviews system (`js/reviews.js`) allows you to manage customer reviews that are dynamically displayed on the home page. It randomly selects 3 reviews from your collection each time the page loads.

## Review Structure
Each review object has the following properties:

```javascript
{
    name: 'Customer Name',           // Name of the reviewer
    text: 'Review text...',          // The review content
    rating: 5,                       // Star rating (1-5)
    date: '2025-11-10'              // Date in YYYY-MM-DD format
}
```

## Current Reviews
The system comes with 5 sample reviews:
- **রহিম আহমেদ** - 5 stars - Amazing taste review
- **ফাতিমা খান** - 5 stars - Quality and service review
- **করিম উদ্দিন** - 4 stars - Good quality, slow delivery
- **সুমাইয়া বেগম** - 5 stars - Reliable and exceeds expectations
- **নাজমুল হক** - 5 stars - Good price and quality

## Adding a New Review

### Method 1: Edit `js/reviews.js` directly
1. Open `js/reviews.js`
2. Find the `const reviews = [...]` array
3. Add a new review object:

```javascript
{
    name: 'নতুন নাম',
    text: 'আপনার রিভিউ টেক্সট এখানে...',
    rating: 5,
    date: '2025-11-15'
}
```

4. Save the file

### Method 2: Use JavaScript console (for testing)
In browser console:
```javascript
addReview({
    name: 'নতুন নাম',
    text: 'রিভিউ টেক্সট',
    rating: 5,
    date: '2025-11-15'
});
```

## Editing a Review
1. Open `js/reviews.js`
2. Find the review by customer name
3. Edit the properties:
   - `text`: Change review content
   - `rating`: Change star rating (1-5)
   - `date`: Update date in YYYY-MM-DD format
   - `name`: Change customer name

Example:
```javascript
{
    name: 'রহিম আহমেদ',
    text: 'সত্যিই অসাধারণ পণ্য! অত্যন্ত সন্তুষ্ট।',  // Updated text
    rating: 5,
    date: '2025-11-12'                              // Updated date
}
```

## Removing a Review

### Method 1: Edit file directly
1. Open `js/reviews.js`
2. Find and delete the review object from the array
3. Save the file

Example - removing the entire object including the comma:
```javascript
const reviews = [
    { ... first review ... },
    { ... second review ... },
    // DELETE THIS ENTIRE LINE:
    // { name: 'To Remove', text: '...', rating: 5, date: '2025-11-10' },
    { ... other reviews ... }
];
```

### Method 2: Use JavaScript console
In browser console:
```javascript
removeReview('রহিম আহমেদ');  // Removes by customer name
```

## Available Functions

### `getRandomReviews(count = 3)`
Returns a specified number of random reviews
```javascript
const threeReviews = getRandomReviews(3);
const oneReview = getRandomReviews(1);
```

### `getAllReviews()`
Returns all reviews in the system
```javascript
const allReviews = getAllReviews();
console.log(`Total reviews: ${allReviews.length}`);
```

### `addReview(review)`
Adds a new review to the system
```javascript
addReview({
    name: 'নাম',
    text: 'রিভিউ',
    rating: 5,
    date: '2025-11-15'
});
```

### `removeReview(name)`
Removes a review by customer name
```javascript
removeReview('রহিম আহমেদ');
```

### `getReviewsByRating(rating)`
Gets all reviews with a specific rating
```javascript
const fiveStarReviews = getReviewsByRating(5);
const fourStarReviews = getReviewsByRating(4);
```

### `getAverageRating()`
Returns the average rating across all reviews
```javascript
const avgRating = getAverageRating();
console.log(`Average rating: ${avgRating} / 5`);
```

### `displayRandomReviews(containerId, count = 3)`
Displays random reviews in a specific HTML container
```javascript
displayRandomReviews('reviewsContainer', 3);  // On homepage
displayRandomReviews('otherContainer', 5);    // Show 5 reviews elsewhere
```

## Display Details
- **Home Page**: Shows 3 random reviews
- **Refresh**: Each page load displays different random reviews
- **Format**: 
  - Customer name (in Bengali)
  - Date (YYYY-MM-DD format)
  - Star rating (★ symbols)
  - Review text

## Styling
Review cards are styled in `css/style.css` with:
- Hover effects (lifts up slightly)
- Responsive grid layout (1-3 columns based on screen size)
- Animation on page load
- Bengali font support

## Tips for Best Results

1. **Variety**: Mix ratings (not just 5 stars) for authenticity
2. **Dates**: Use actual dates when reviews are added
3. **Length**: Keep reviews between 10-50 words for readability
4. **Language**: Use Bengali names and text for authenticity
5. **Updates**: Add new reviews regularly to keep content fresh
6. **Average**: The system calculates average rating from all reviews

## Troubleshooting

### Reviews not showing?
1. Check browser console for errors
2. Verify `reviews.js` is loaded (check HTML script tags)
3. Ensure `displayRandomReviews()` is called in `app.js` initialization
4. Clear browser cache and reload

### Reviews always the same?
- This is normal! The random selection might pick the same 3 reviews
- Add more reviews to have more variation
- Each page reload should show different selections (statistically)

### Wrong format?
- Ensure dates are in `YYYY-MM-DD` format
- Ratings must be 1-5
- All fields (name, text, rating, date) are required

## Example: Adding 3 More Reviews

```javascript
{
    name: 'আয়শা রানী',
    text: 'অনলাইনে যা দেখেছিলাম তার চেয়ে পণ্য অনেক ভালো। দ্রুত ডেলিভারি।',
    rating: 5,
    date: '2025-11-14'
},
{
    name: 'সালিম হোসেন',
    text: 'ভালো কোয়ালিটি তবে দাম একটু বেশি। পরের বার কিনব কিনা জানি না।',
    rating: 3,
    date: '2025-11-13'
},
{
    name: 'নাজমা বিবি',
    text: 'পরিবারের সবাই পছন্দ করেছে। আবার অর্ডার দেব নিশ্চিত।',
    rating: 5,
    date: '2025-11-12'
}
```

## Next Steps
- Add more reviews as customers provide feedback
- Display average rating on the page
- Create an admin panel to add/remove reviews (future feature)
- Integrate with Firebase to store reviews permanently

