const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const Reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(Reviews.newReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(Reviews.deleteReview))


module.exports = router;
