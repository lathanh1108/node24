const Models = require('../models/index');
const { successResponse, failedResponse, errorResponse } = require('../utils/response');

//  Get User List
const list = async (req, res) => {
    let users = await Models.user.findAll();

    successResponse(res, users, "Success");
}

// Get User Detail
const detail = async (req, res) => {
    let { id } = req.params;

    try {
        let user = await Models.user.findByPk(id);

        user ? successResponse(res, user, "Success") : successResponse(res, '', 'Dont have user');
    } catch (error) {
        console.log(error);
        errorResponse(res, error)
    }
}

// Create User
const create = async (req, res) => {
    let params = req.body;

    try {
        let newUser = await Models.user.findOrCreate({
            where: {
                email: params.email
            },
            defaults: params
        })

        successResponse(res, newUser[0], "Add User Success")
    } catch (error) {
        errorResponse(res, error)
    }
}

// Update User
const update = async (req, res) => {
    let { id } = req.params;
    let params = req.body;

    try {
        let user = await Models.user.findByPk(id);

        if (user) {
            user = await Models.user.update(params, {
                where: {
                    user_id: id
                }
            });

            user = await Models.user.findByPk(id);
            successResponse(res, user, 'Update User Success')
        } else {
            failedResponse(res, user, 'Update User Failed')
        }
    } catch (error) {
        errorResponse(res, error)
    }
}

// Remove User
const remove = async (req, res) => {
    let { id } = req.params;

    try {
        let isRemove = await Models.user.destroy({
            where: {
                user_id: id
            }
        })

        isRemove ? successResponse(res, '', 'Remove user successful') : failedResponse(res, '', 'Remove user failed');
    } catch (error) {
        errorResponse(res, error)
    }
}

module.exports = { list, detail, create, update, remove }