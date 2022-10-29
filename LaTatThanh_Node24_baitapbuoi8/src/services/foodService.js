const Models = require('../models/index');
const Food = Models.user;

const foodExist = async (food_id) => {
    let food = await Food.findOne({ where: food_id });

    return food ? true : false;
}

module.exports = { foodExist }