const { ALLOWED_FIELD } = require('../constants/constants')
const STATUS_CODES = require('../constants/statusCodes')

function fieldValidator(req, res, next) {
    for (const key in req.body) {
        if (!ALLOWED_FIELD.includes(key)) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: `${key} is not allowed`,
            })
        }
    }
    next()
}
module.exports = fieldValidator
