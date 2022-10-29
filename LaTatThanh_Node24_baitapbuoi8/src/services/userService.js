const Models = require('../models/index');
const User = Models.user;

const userExist = async (user_id) => {
    let user = await User.findOne({ where: user_id });

    return user ? true : false;
}

module.exports = { userExist }