const express = require('express');
const { getLike, getRate } = require('../controllers/userController');
const userRoute = express.Router();

// Show all user and restaurants they like.
userRoute.get('/like-statistic', getLike);

// Show the user is indicated and restaurant they like.
userRoute.get('/like-statistic/:user_id', getLike);

// Show all user and restaurants they rate.
userRoute.get('/rate-statistic', getRate);

// Show the user is indicated and restaurant they like.
userRoute.get('/rate-statistic/:user_id', getRate);

// Export route
module.exports = { userRoute }