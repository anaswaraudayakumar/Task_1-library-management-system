const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../constants/constants')
function pagination(query) {
    const page = Number(query.page) || DEFAULT_PAGE
    const limit = Number(query.limit) || DEFAULT_LIMIT
    const skip = (page - 1) * limit
    return {
        page,
        limit,
        skip,
    }
}

module.exports = pagination
