const express = require('express')
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');

const Campgrounds = require('../controllers/campgrounds')

const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');




router.route('/')
    .get(catchAsync(Campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(Campgrounds.createCampground));

router.get('/new', isLoggedIn, Campgrounds.renderNewFrom)


router.route('/:id')
    .get(catchAsync(Campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(Campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(Campgrounds.deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(Campgrounds.renderEditForm))

module.exports = router;