const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')
const {
    addBorrowService,
    addRenewService,
    getAllService,
} = require('../services/borrowService')

//create borrow
async function createBorrowController(req, res) {
    const data = req.body
    try {
        const newBorrow = await addBorrowService(req.payload, data)
        res.success(MESSAGES.CREATED_SUCCESS, newBorrow, STATUS_CODES.CREATED)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
//create renew
async function renewController(req, res) {
    const { id } = req.params
    try {
        const renewResult = await addRenewService(id)
        res.success(MESSAGES.RENEW, renewResult, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
async function getAllController(req, res) {
    const id = req.payload
    try {
        const getAllBorrowed = await getAllService(req.query, id)
        res.success(MESSAGES.GET_ALL, getAllBorrowed, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}

module.exports = {
    createBorrowController,
    renewController,
    getAllController,
}
