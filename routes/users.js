const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Users = require('../controllers/users')



router.route('/register')
    .get(Users.registerForm)
    .post(catchAsync(Users.register));

router.route('/login')
    .get(Users.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), Users.login)


router.get('/logout', Users.logout)

module.exports = router;