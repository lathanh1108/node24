const express = require('express');
const rootRoute = express.Router();
const { userRoute } = require('./userRoutes');
const { resRoute } = require('./resRoutes');
const { orderRoute } = require('./orderRoute');

rootRoute.use('/user', userRoute);

rootRoute.use('/res', resRoute);

rootRoute.use('/order', orderRoute);

module.exports = rootRoute;
