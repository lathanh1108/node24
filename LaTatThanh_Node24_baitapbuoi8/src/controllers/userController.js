const Models = require('../models/index');
const { successResponse, failedResponse, errorResponse } = require('../utils/response');

const User = Models.user;
const Res = Models.restaurant;

// Get user with like
const getLike = async (req, res) => {
    try {
        const { user_id } = req.params;
        const model = {
            model: Res,
            as: 'restaurant_like'
        };

        if (user_id) {
            // Show indicated user
            let user = await User.findOne({
                where: { user_id },
                include: model
            });

            if (user)
                successResponse(res, user, "Success!");
            else
                failedResponse(res, '', 'User not exist!');

        } else {
            // Show all users
            let users = await User.findAll({ include: model })

            if (users) {
                successResponse(res, users, 'Success!!')
            } else {
                failedResponse(res, '', "Don't have any user!")
            }
        }

    } catch (error) {
        errorResponse(res, 'System Error!')
    }
}

// Get user with like
const getRate = async (req, res) => {
    try {
        const { user_id } = req.params;
        const model = {
            model: Res,
            as: 'restaurant_rate'
        };

        if (user_id) {
            // Show indicated user
            let user = await User.findOne({
                where: { user_id },
                include: model
            });

            if (user)
                successResponse(res, user, "Success!");
            else
                failedResponse(res, '', 'User not exist!');

        } else {
            // Show all users
            let users = await User.findAll({ include: model })

            if (users) {
                successResponse(res, users, 'Success!!')
            } else {
                failedResponse(res, '', "Don't have any user!")
            }
        }

    } catch (error) {
        errorResponse(res, 'System Error!')
    }
}

module.exports = { getLike, getRate }