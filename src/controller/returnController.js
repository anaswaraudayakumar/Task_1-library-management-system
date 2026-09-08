const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')
const { finePayService, getAllFineService } = require('../services/fineService')
const { addReturnService } = require('../services/returnService')

async function returnController(req, res) {
    const { id } = req.params
    try {
        const returnResult = await addReturnService(id)
        res.success(MESSAGES.RETURN,returnResult, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}

async function fineController(req, res) {
    const { id } = req.params
    try {
        const finePay = await finePayService(id)
        res.success(MESSAGES.INE_PAY_SUCCESS, finePay, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
async function getAllFineController(req, res) {
    const { memberId } = req.query
    try {
        const findAll = await getAllFineService(memberId)
        res.success(MESSAGES.GET_ALL, findAll, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
module.exports = { returnController, fineController, getAllFineController }
