const Models = require('../models/index');
const Food = Models.food;
const SubFood = Models.sub_food;

const { Op } = require('sequelize');

// Check sub food exist or not
const subFoodExist = async (sub_id) => {
    if (Array.isArray(sub_id)) {
        // If pass array sub_id
        let subFood = await SubFood.findAll({
            where: {
                sub_id: {
                    [Op.in]: sub_id
                }
            }
        });

        return subFood ? true : false;
    } else {
        // If pass single sub_id
        let subFood = await SubFood.findOne({
            where: {
                sub_id
            }
        })

        return subFood ? true : false;
    }
}

module.exports = { subFoodExist }