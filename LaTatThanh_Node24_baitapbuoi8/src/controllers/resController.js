const Models = require('../models/index');
const rate_res = require('../models/rate_res');
const { restaurantExist } = require('../services/resService');
const { userExist } = require('../services/userService');
const { getDateNow } = require('../utils/format');
const { successResponse, failedResponse, errorResponse } = require('../utils/response');

const Res = Models.restaurant;
const User = Models.user;
const LikeRes = Models.like_res;
const RateRes = Models.rate_res;

// Get user like restaurant
const getLike = async (req, res) => {
    try {
        const { res_id } = req.params;
        let model = {
            model: User,
            as: 'users_liked',
            through: {
                attributes: []
            }
        };

        if (res_id) {
            // Get restaurant with id and all user like it.
            let restaurant = await Res.findOne({
                where: {
                    res_id
                },
                include: model
            })

            if (restaurant) {
                successResponse(res, restaurant, 'Success!');
            } else {
                failedResponse(res, '', 'Restaurant not exist!')
            }
        } else {
            // Get all restaurant and all user like it.
            let restaurants = await Res.findAll({
                include: model
            })

            successResponse(res, restaurants, 'Success!');
        }
    } catch (error) {
        errorResponse(res, 'System error!')
    }
}

// Like/Unlike
const likeOrUnlike = async (req, res) => {
    try {
        const { user_id } = req.body;
        const { res_id } = req.params;
        let data = { res_id: Number(res_id), user_id };

        if (await userExist(data.user_id) && await restaurantExist(data.res_id)) {
            let resLike = await LikeRes.findOne({ where: data })

            if (resLike) {
                // Unlike restaurant
                await LikeRes.destroy({ where: data })

                successResponse(res, '', 'Unlike Success!');
            } else {
                // Like restaurant
                let now = getDateNow();
                data = { ...data, date_like: now }

                await LikeRes.create(data);

                successResponse(res, '', 'Like Success!');
            }
        } else {
            failedResponse(res, '', 'User or Restaurant no exist!')
        }
    } catch (error) {
        errorResponse(res, 'System error!')
    }
}

// Get rating of restaurant
const getRating = async (req, res) => {
    try {
        const { res_id } = req.params;
        let model = {
            model: User,
            as: 'users_rate',
            through: {
                attributes: ['amount']
            }
        };

        if (res_id) {
            // Get restaurant with id and all user rating it.
            let restaurant = await Res.findOne({
                where: {
                    res_id
                },
                include: model
            })

            if (restaurant) {
                successResponse(res, restaurant, 'Success!');
            } else {
                failedResponse(res, '', 'Restaurant not exist!')
            }
        } else {
            // Get all restaurant and all user rating it.
            let restaurants = await Res.findAll({
                include: model
            })

            successResponse(res, restaurants, 'Success!');
        }
    } catch (error) {
        errorResponse(res, 'System error!')
    }
}

// Rating restaurant
const rating = async (req, res) => {
    try {
        const { res_id } = req.params;
        const { user_id, amount } = req.body;
        let data = { res_id: Number(res_id), user_id };
        let rateData = { ...data, amount };

        if (await userExist(data.user_id) && await restaurantExist(data.res_id)) {
            let resRate = await RateRes.findOne({ where: data });

            if (resRate) {
                // Update rating if a user was rating the restaurant before
                await RateRes.update(rateData, { where: data });

                let restaurant = await Res.findOne({
                    where: { res_id: data.res_id },
                    include: {
                        model: User,
                        as: 'users_rate',
                        where: { user_id },
                        through: {
                            attributes: ['amount']
                        }
                    }
                })

                successResponse(res, restaurant, 'Update rating success!')
            } else {
                // Create rating if a user never rating the restaurant before
                await RateRes.create(rateData);

                let restaurant = await Res.findOne({
                    where: { res_id: data.res_id },
                    include: {
                        model: User,
                        as: 'users_rate',
                        where: { user_id }
                    }
                })

                successResponse(res, restaurant, 'Rating success!')
            }
        } else {
            failedResponse(res, '', 'User or Restaurant no exist!')
        }

    } catch (error) {
        errorResponse(res, 'System error!');
    }
}

module.exports = { getLike, getRating, likeOrUnlike, rating }
