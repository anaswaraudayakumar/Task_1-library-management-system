const mongoose = require('mongoose')
const getDueDate = require('../utility/date')
const { BORROW_STATUS } = require('../constants/constants')

const borrowSchema = mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
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
        borrowedDate: {
            type: Date,
            default: Date.now,
        },
        renewingDate: {
            type: Date,
            default: null,
        },
        returnDate: {
            type: Date,
            default: null,
        },
        dueDate: {
            type: Date,
            default: getDueDate(),
        },
        status: {
            type: String,
            enum: BORROW_STATUS,
            default: 'borrowed',
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Borrow', borrowSchema)
