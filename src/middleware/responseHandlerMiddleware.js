const logger = require('../utility/logger')

function responseHandler(req, res, next) {
    res.success = (message, data = null, code = 200) => {
        res.locals.message = message
        return res.status(code).json({
            succes: true,
            message,
            data,
            requestID: req.requestId,
            timestamp: new Date(),
        })
    }

    res.fail = (message, code = 500) => {
        res.locals.message = message

        logger.error(message, {
            requestId: req.requestId,
            statusCode: code,
            timestamp: new Date(),
        })

        return res.status(code).json({
            succes: false,
            message,
            requestID: req.requestId,
            timestamp: new Date(),
        })
    }
    next()
}
module.exports = responseHandler
