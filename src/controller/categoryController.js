const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')
const {
    createCategoryService,
    getAllCategoryService,
} = require('../services/categoryService')

async function createController(req, res) {
    try {
        const category = await createCategoryService(req.body)

        res.success(MESSAGES.CREATED_SUCCESS, category, STATUS_CODES.CREATED)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
async function getAllController(req, res) {
    try {
        const categories = await getAllCategoryService(req.query)
        res.success(MESSAGES.GET_ALL, categories, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
module.exports = { createController, getAllController }
