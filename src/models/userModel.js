const mongoose = require('mongoose')
const { USERTYPES } = require('../constants/constants')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            lowercase: true,
            enum: { values: USERTYPES },
            default: 'member',
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        active: {
            type: String,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
