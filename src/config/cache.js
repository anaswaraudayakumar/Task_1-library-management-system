const { createKeyv } = require('@keyv/redis')
const { createCache } = require('cache-manager')
const connectionString = process.env.REDIS_CONNECTION_STRING
const cache = createCache({
    stores: [
        //redis store
        createKeyv(connectionString),
    ],
})

module.exports = cache
