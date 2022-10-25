const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController');

// Get Users
userRoute.get('/list', userController.list);

// Get User Detail
userRoute.get('/:id', userController.detail);

// Create User
userRoute.post('/create', userController.create);

// Update User
userRoute.put('/update/:id', userController.update);

// Delete User
userRoute.delete('/remove/:id', userController.remove);

// Export route
module.exports = { userRoute }