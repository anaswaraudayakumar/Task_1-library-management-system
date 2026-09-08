const { ALLOWED_FIELD } = require('../constants/constants')
const STATUS_CODES = require('../constants/statusCodes')

function fieldValidator(req, res, next) {
    for (const key in req.body) {
        if (!ALLOWED_FIELD.includes(key)) {
            const message = `${key} is not allowed`
            res.fail(message, STATUS_CODES.BAD_REQUEST)
        }
    }
    next()
}
module.exports = fieldValidator
