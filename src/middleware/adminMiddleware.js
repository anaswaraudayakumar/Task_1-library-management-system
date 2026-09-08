const jwt = require('jsonwebtoken')
const STATUS_CODES = require('../constants/statusCodes')
const MESSAGES = require('../constants/messages')

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET)
            console.log(jwtResponse)
            // req.payload = jwtResponse._id;
            const role = jwtResponse.role
            if (role == 'admin') {
                next()
            } else {
                res.fail(MESSAGES.INV_TOKEN, STATUS_CODES.UN_AUTHORIZED)
            }
        } catch (error) {
            console.log(error)

            res.fail(MESSAGES.INV_TOKEN, STATUS_CODES.UN_AUTHORIZED)
        }
    } else {
        //MESSAGES
        res.fail(MESSAGES.AUTH_FAIL, STATUS_CODES.UN_AUTHORIZED)
    }
}
module.exports = adminMiddleware
