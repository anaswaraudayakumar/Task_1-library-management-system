const { FINE_PER_DAY } = require('../constants/constants')

function finePerDay(dueDate) {
    const overDue = Math.max(
        0,
        Math.floor((Date.now() - new Date(dueDate)) / (1000 * 60 * 60 * 24))
    )
    return overDue * FINE_PER_DAY
}
module.exports = finePerDay
