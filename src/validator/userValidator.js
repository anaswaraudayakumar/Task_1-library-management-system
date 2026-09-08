const MESSAGES = require('../constants/messages')
const {
    USERTYPES,
    PASSWORD_MIN_LENGTH,
    EMAILREGEX,
} = require('../constants/constants')
const STATUS_CODES = require('../constants/statusCodes')

function registerValidation(req, res, next) {
    console.log('Inside registervalidation')
    const { name, role, email, password } = req.body
    if (!name || !role || !email || !password) {
        res.fail(MESSAGES.INCOMPLETE_FORM, STATUS_CODES.BAD_REQUEST)

    }
    //role
    if (role) {
        req.body.role = role.toLowerCase()
        if (!USERTYPES.includes(req.body.role)) {
            res.fail(MESSAGES.NOT_FOUND, STATUS_CODES.BAD_REQUEST)
        }
    }
    //email regex checking

    if (!EMAILREGEX.test(email)) {
        res.fail(MESSAGES.INVALID_MAIL, STATUS_CODES.BAD_REQUEST)
    }

    //password validation
    if (password.length < PASSWORD_MIN_LENGTH) {
        res.fail(MESSAGES.INVALID_PASSWORD, STATUS_CODES.BAD_REQUEST)
    }

    next()
}

function loginValidation(req, res, next) {
    console.log('inside Login validation')
    const { email, password } = req.body
    if (!email || !password) {
        res.fail(MESSAGES.INCOMPLETE_FORM, STATUS_CODES.BAD_REQUEST)
    }
    //email regex checking

    if (!EMAILREGEX.test(email)) {
        res.fail(MESSAGES.INVALID_MAIL, STATUS_CODES.BAD_REQUEST)

    }

    //password validation
    if (password.length < 6) {
        return res
            .status(STATUS_CODES.BAD_REQUEST)
            .json(MESSAGES.INVALID_PASSWORD)
    }

    next()
}

module.exports = { registerValidation, loginValidation }
