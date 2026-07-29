const cache = require('../config/cache')

async function save(key, value, ttl = 300000) {
    await cache.set(key, value, ttl)
}

async function get(key) {
    return await cache.get(key)
}
async function remove(key) {
    return await cache.del(key)
}

module.exports = { save, get, remove }
