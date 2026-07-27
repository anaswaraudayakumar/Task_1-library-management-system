const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')
const { addReturnService } = require('../services/returnService')

async function returnController(req, res) {
    const { id } = req.params
    try {
        const returnResult = await addReturnService(id)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.RETURN,
            data: returnResult,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
module.exports = { returnController }
