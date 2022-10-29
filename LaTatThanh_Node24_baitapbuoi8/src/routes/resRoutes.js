const express = require('express');
const { getLike, likeOrUnlike, getRating, rating } = require('../controllers/resController');
const resRoute = express.Router();

// Show list all restaurant with user like it.
resRoute.get('/like-statistic', getLike);

// Show the restaurant is indicated and users like it. 
resRoute.get('/like-statistic/:res_id', getLike);

// Show list all restaurant with user rating it.
resRoute.get('/rate-statistic', getRating);

// Show the restaurant is indicated and users rating it.
resRoute.get('/rate-statistic/:res_id', getRating);

// Like and Unlike restaurant
resRoute.post('/like/:res_id', likeOrUnlike);

// rating restaurant
resRoute.post('/rating/:res_id', rating);

// Export route
module.exports = { resRoute }