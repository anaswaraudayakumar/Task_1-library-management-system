const mongoose = require('mongoose')
const { FINE_STATUS } = require('../constants/constants')

const fineSchema = mongoose.Schema(
    {
        borrowId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Borrow',
            required: true,
        },
        memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        librarianId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        fineAmount: {
            type: Number,
            required: true,
        },
        fineStatus: {
            type: String,
            enum: FINE_STATUS,
            default: 'unpaid',
        },
    },
    { timestamps: true }
)
module.exports = mongoose.model('Fine', fineSchema)
