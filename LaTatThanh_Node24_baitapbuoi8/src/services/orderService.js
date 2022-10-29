const Models = require('../models/index');
const Order = Models.order;

const orderExist = async (user_id, food_id) => {
    let order = await Order.findOne({ where: { user_id, food_id } });

    return order ? true : false;
}

module.exports = { orderExist }