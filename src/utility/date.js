function getDueDate(DAYS = 7) {
    return new Date(Date.now() + DAYS * 24 * 60 * 60 * 1000)
}

module.exports = getDueDate
