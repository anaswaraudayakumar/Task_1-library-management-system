const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')
const {
    createCategoryService,
    getAllCategoryService,
} = require('../services/categoryService')

async function createController(req, res) {
    try {
        const category = await createCategoryService(req.body)
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.CREATED_SUCCESS,
            data: category,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
async function getAllController(req, res) {
    try {
        const categories = await getAllCategoryService(req.query)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.GET_ALL,
            data: categories,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
module.exports = { createController, getAllController }
