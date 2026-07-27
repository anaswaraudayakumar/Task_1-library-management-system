const mongoose = require('mongoose')
const Borrow = require('../models/bookBorrowModel')

async function addBorrow(data) {
    const createBorrow = await Borrow.create(data)
    return createBorrow
}
async function getOneDetail(id) {
    const getOneDetail = await Borrow.findById(id)
    return getOneDetail
}

async function getAll(query, id) {
    const filter = { librarianId: new mongoose.Types.ObjectId(id) }
    if (query.status) {
        filter.status = query.status
    }

    const getAll = await Borrow.aggregate([
        {
            $match: filter,
        },
        {
            $sort: { dueDate: 1 },
        },
        {
            $lookup: {
                from: 'books',
                localField: 'bookId',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            bookName: 1,
                            totalCopies: 1,
                            activeBooks: 1,
                            status: 1,
                        },
                    },
                ],
                as: 'book',
            },
        },
        { $unwind: '$book' },
        {
            $lookup: {
                from: 'users',
                localField: 'memberId',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                        },
                    },
                ],
                as: 'member',
            },
        },
        { $unwind: '$member' },
        {
            $lookup: {
                from: 'users',
                localField: 'librarianId',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                        },
                    },
                ],
                as: 'librarian',
            },
        },
        { $unwind: '$librarian' },
        // {$count:'totalBorrow'}
    ])

    return getAll
}
async function updateDetails(id, data) {
    const updateBook = await Borrow.findByIdAndUpdate({ _id: id }, data, {
        returnDocument: 'after',
    })
    console.log(updateBook)

    return updateBook
}

module.exports = {
    addBorrow,
    getOneDetail,
    getAll,
    updateDetails,
}
