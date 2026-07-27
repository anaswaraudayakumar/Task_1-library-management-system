const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')
const {
    addBorrowService,
    addRenewService,
    getAllService,
} = require('../services/borrowService')

async function createBorrowController(req, res) {
    const data = req.body
    try {
        const newBorrow = await addBorrowService(req.payload, data)
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.CREATED_SUCCESS,
            data: newBorrow,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
async function renewController(req, res) {
    const { id } = req.params
    try {
        const renewResult = await addRenewService(id)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.RENEW,
            data: renewResult,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
async function getAllController(req, res) {
    const id = req.payload
    try {
        const getAllBorrowed = await getAllService(req.query, id)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.GET_ALL,
            data: getAllBorrowed,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    createBorrowController,
    renewController,
    getAllController,
}
