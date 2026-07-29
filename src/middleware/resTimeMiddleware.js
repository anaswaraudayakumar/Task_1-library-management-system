// response time getting middleware
const { performance } = require('node:perf_hooks')

async function responseTime(req, res, next) {
    const start = performance.now()
    res.on('finish', () => {
        const end = performance.now()
        const timeTaken = (end - start).toFixed(2)
        console.log(`${timeTaken} ms`)
    })
    next()
}
module.exports = responseTime
