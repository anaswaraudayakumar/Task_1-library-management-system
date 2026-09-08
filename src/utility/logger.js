const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const asyncLocalStorage = require('./asyncLocalStorage')
const addRequestId = winston.format((info) => {
    info.requestId = asyncLocalStorage.getStore()?.requestId
    return info
})
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        addRequestId(),
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '7d',
        }),
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxFiles: '14d',
        }),
    ],
})
module.exports = logger
