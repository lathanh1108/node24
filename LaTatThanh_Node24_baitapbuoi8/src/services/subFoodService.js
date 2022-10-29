const Models = require('../models/index');
const Food = Models.food;
const SubFood = Models.sub_food;

const { Op } = require('sequelize');

// Check sub food exist or not
const subFoodExist = async (sub_id) => {
    if (Array.isArray(sub_id)) {
        let subFood = await SubFood.findAll({
            where: {
                sub_id: {
                    [Op.in]: sub_id
                }
            }
        });

        return subFood ? true : false;
    } else {
        let subFood = await SubFood.findOne({
            where: {
                sub_id
            }
        })

        return subFood ? true : false;
    }
}

// Check sub food belong to food or not
const checkSubFoodBelongFood = async (food_id, arr_sub_id) => {
    // Get Food info includes sub food list
    let food = await Food.findOne({
        where: { food_id },
        include: {
            model: SubFood,
            as: 'sub_foods',
            attributes: ['sub_id']
        }
    });

    // Convert sub food list to array include sub food id
    let subFoods = food.sub_foods.map(subFood => subFood.sub_id);

    let result = {
        status: true,
        sub_foods: []
    };

    // Check all sub foods belong to food or not.
    // Return a sub_id not belong to food
    // let checkSubFoods = arr_sub_id.every(sub_id => subFoods.includes(sub_id));
    arr_sub_id.forEach(sub_id => {
        let checkSubFood = subFoods.includes(sub_id);

        if (!checkSubFood) {
            result.status = false;
            result.sub_foods.push(sub_id);
        }
    });

    return result;
}

module.exports = { subFoodExist, checkSubFoodBelongFood }