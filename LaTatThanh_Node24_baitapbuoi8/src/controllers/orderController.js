const Models = require('../models/index');
const { foodExist } = require('../services/foodService');
const { orderExist } = require('../services/orderService');
const { subFoodExist } = require('../services/subFoodService');
const { userExist } = require('../services/userService');
const { successResponse, failedResponse, errorResponse } = require('../utils/response');

const Order = Models.order;

// Create order
const create = async (req, res) => {
    try {
        const { user_id, food_id, amount, code, arr_sub_id } = req.body;

        // Simple validate exist data
        if (!await userExist(user_id))
            failedResponse(res, '', 'User not exist');

        if (!await foodExist(food_id))
            failedResponse(res, '', 'Food not exist');

        if (await orderExist(user_id, food_id))
            failedResponse(res, '', 'Order exist');

        if (!await subFoodExist(arr_sub_id))
            failedResponse(res, '', 'Sub food not exist');
        // End validate

        // All sub food belong to food
        const data = { user_id, food_id, amount, code, arr_sub_id: '[' + arr_sub_id.toString() + ']' };

        let result = await Order.create(data);

        // Convert sub_id from string to array
        result.arr_sub_id = await convertArraySubFood(result.arr_sub_id);

        if (result)
            successResponse(res, result, 'Order success!!')
        else
            failedResponse(res, '', 'Order Failed!');
    } catch (error) {
        console.log(error);
        errorResponse(res, 'System error')
    }
}

const convertArraySubFood = async (arr_sub_id) => {
    return await arr_sub_id.replace(/\[|\]/g, '').split(",").map(Number);
}

module.exports = { create }