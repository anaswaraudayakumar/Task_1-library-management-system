const mongoose = require('mongoose')

function validator(req, schema) {
    for (const key in req.body) {
        if (schema[key] === 'string') {
            const error = stringValidator(key, req.body[key])
            if (error) return error
        }
        if (schema[key] === 'number') {
            const error = numberValidator(key, req.body[key])
            if (error) return error
        }
    }
    for (const key in req.query) {
        if (schema[key] === 'id') {
            const isValid = mongoose.isValidObjectId(req.query[key])
            if (!isValid) return `${key} havn't valid object id`
        }
        if (schema[key] === 'string') {
            const error = stringValidator(key, req.query[key])
            if (error) return error
        }
        if (schema[key] === 'number') {
            const error = numberValidator(key, req.query[key])
            if (error) return error
        }
    }
    return null
}

function stringValidator(key, value) {
    if (typeof value !== 'string') {
        return `${key} must be a string`
    } else {
        if (value.trim() === '') {
            return `${key} must have a value`
        }
    }
    return null
}

function numberValidator(key, value) {
    if (value === undefined || value === null || value === '') {
        return `${key} must have a number`
    }

    const num = Number(value)
    if (Number.isNaN(num) || !Number.isInteger(num)) {
        return `${key} must have a valid integer`
    }

    return null
}

module.exports = validator
