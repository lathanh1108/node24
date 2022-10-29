const Models = require('../models/index');
const Res = Models.restaurant;

const restaurantExist = async (res_id) => {
    let restaurant = await Res.findOne({ where: res_id });

    return restaurant ? true : false;
}

module.exports = { restaurantExist }