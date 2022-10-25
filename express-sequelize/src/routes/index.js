const express = require('express');
const rootRoute = express.Router();
const { userRoute } = require('./userRoute');
const { footRoute } = require('./footRoute');

rootRoute.use('/user', userRoute);
rootRoute.use('/food', footRoute);

module.exports = rootRoute;
