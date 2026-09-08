const crypto = require('crypto')
const asyncLocalStorage = require('../utility/asyncLocalStorage')
const logger = require('../utility/logger')

const loggerRequest = (req, res, next) => {
    req.requestId = crypto.randomUUID()
    asyncLocalStorage.run({ requestId: req.requestId }, () => {
        res.on('finish', () => {
            logger.info(res.locals.message || 'request completed')
        })
        next()
    })
}
module.exports = loggerRequest
