const { SCHEMA } = require('../constants/constants')
const validator = require('../utility/validatorFun')
const STATUS_CODES = require('../constants/statusCodes')

function genValidator(req, res, next) {
    const error = validator(req, SCHEMA)
    if (error) {
        console.log(error)
        res.fail(error, STATUS_CODES.BAD_REQUEST)

        
    }
    next()
}
module.exports = genValidator

