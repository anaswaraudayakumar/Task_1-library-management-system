const jwt = require('jsonwebtoken')
const STATUS_CODES = require('../constants/statusCodes')
const MESSAGES = require('../constants/messages')

function librarianMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET)
            console.log(jwtResponse)
            req.payload = jwtResponse.id
            const role = jwtResponse.role
            if (role == 'librarian') {
                next()
            } else {
                res.status(STATUS_CODES.UN_AUTHORIZED).json(MESSAGES.INV_TOKEN)
            }
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.UN_AUTHORIZED).json(MESSAGES.INV_TOKEN)
        }
    } else {
        //MESSAGES
        res.status(STATUS_CODES.UN_AUTHORIZED).json(MESSAGES.AUTH_FAIL)
    }
}
module.exports = librarianMiddleware
