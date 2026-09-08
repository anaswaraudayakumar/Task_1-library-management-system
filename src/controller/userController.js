const {
    registerUser,
    loginUser,
    updateUserByAdmin,
    getAllUsers,
} = require('../services/userService')
const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')

async function registerController(req, res) {
    console.log('Inside register controller')
    try {
        const user = await registerUser(req.body)
        res.success(MESSAGES.REGISTER_SUCCESS, user, STATUS_CODES.CREATED)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
async function loginController(req, res) {
    console.log('Inside loginController')
    try {
        const userInfo = await loginUser(req.body)
        res.success(MESSAGES.LOGIN_SUCCESS, userInfo, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
// user edit by admin controller
async function userEditController(req, res) {
    console.log('Inside  userEditController ')
    const { id } = req.params
    const userData = req.body
    try {
        const updatedUser = await updateUserByAdmin(id, userData)
        res.success(MESSAGES.UPDATE_SUCCESS, updatedUser, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}

async function getAllUserController(req, res) {
    console.log('Inside getAllUserController')
    try {
        const users = await getAllUsers(req.query)
        res.success(MESSAGES.GET_ALL, users, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}

module.exports = {
    registerController,
    loginController,
    userEditController,
    getAllUserController,
}
