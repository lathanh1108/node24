const express = require('express');
const { create } = require('../controllers/orderController');
const orderRoute = express.Router();

orderRoute.post('/create', create);

module.exports = { orderRoute }



