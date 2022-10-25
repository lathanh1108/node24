const Models = require('../models/index');
const { successResponse, failedResponse, errorResponse } = require('../utils/response');

const list = async (req, res) => {
    try {
        let data = await Models.food.findAll({ include: "type" });

        successResponse(res, data, "Food list");
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { list }