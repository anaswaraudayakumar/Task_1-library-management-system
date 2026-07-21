const jwt = require('jsonwebtoken')
const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')

function authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET)
            console.log(jwtResponse)
            req.payload = jwtResponse.email
            next()
        } catch (error) {
            res.status(STATUS_CODES.UN_AUTHORIZED).json(MESSAGES.INV_TOKEN)
        }
    } else {
        //messages
        res.status(STATUS_CODES.UN_AUTHORIZED).json(MESSAGES.AUTH_FAIL)
    }
}
module.exports = authMiddleware
