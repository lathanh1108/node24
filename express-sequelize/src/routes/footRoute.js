const express = require('express');
const footRoute = express.Router();
const foodController = require('../controllers/foodController');
const { upload } = require('../utils/upload');


footRoute.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.json({
            message: "Upload Success!!!",
            url: `${req.file.destination}/${req.file.filename}`
        })
    } catch (err) {
        res.json(err)
    }
});

// Get Users
footRoute.get('/list', foodController.list);

// Export route
module.exports = { footRoute }