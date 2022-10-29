const Models = require('../models/index');
const { foodExist } = require('../services/foodService');
const { orderExist } = require('../services/orderService');
const { subFoodExist, checkSubFoodBelongFood } = require('../services/subFoodService');
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

        if (!await foodExist(user_id))
            failedResponse(res, '', 'Food not exist');

        if (await orderExist(user_id, food_id))
            failedResponse(res, '', 'Order exist');

        if (!await subFoodExist(user_id))
            failedResponse(res, '', 'Sub food not exist');
        // End validate

        let isSubFoodsBelong = await checkSubFoodBelongFood(food_id, arr_sub_id); // check if have some sub food not belong to food

        if (isSubFoodsBelong.status) {
            // All sub food belong to food
            const data = { user_id, food_id, amount, code, arr_sub_id: arr_sub_id.toString() };

            let result = await Order.create(data);

            if (result)
                successResponse(res, result, 'Order success!!')
            else
                failedResponse(res, '', 'Order Failed!');
        } else {
            // Have some sub food not belong to food
            failedResponse(res, '', 'Some sub food is not belong to food');
        }

    } catch (error) {
        errorResponse(res, error)
    }
}

module.exports = { create }