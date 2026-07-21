const mongoose = require('mongoose')
const Book = require('../models/bookModel')

//add book
async function addBook(bookData) {
    const createBook = await Book.create(bookData)
    return createBook
}

//get all book
async function getBooks(query, librarianId) {
    const filter = { addedBy: new mongoose.Types.ObjectId(librarianId) }

    //filter using name
    if (query.bookName) {
        filter.bookName = { $regex: query.bookName, $options: 'i' }
    }
    //searching using name
    if (query.search) {
        filter.bookName = { $regex: query.search, $options: 'i' }
    }
    //filter using category
    if (query.category) {
        filter.category = new mongoose.Types.ObjectId(query.category)
    }
    //filter using author
    if (query.author) {
        filter.author = new mongoose.Types.ObjectId(query.author)
    }
    //filter using language
    if (query.language) {
        filter.language = query.language
    }

    //pagination logic by limit and skip
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 3
    const skip = (page - 1) * limit

    // const allBooks = await Book.find(filter).populate("author","authorName").populate("category","categoryName")
    const allBooks = await Book.aggregate([
        {
            //find using the filter
            $match: filter,
        },
        {
            //sort in the basis of created first
            $sort: {
                createdAt: 1,
            },
        },
        {
            //
            $facet: {
                books: [
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $lookup: {
                            from: 'authors',
                            localField: 'author',
                            foreignField: '_id',
                            as: 'author',
                        },
                    },
                    //   { $unwind: "$author" },
                    {
                        $lookup: {
                            from: 'categories',
                            localField: 'category',
                            foreignField: '_id',
                            pipeline: [
                                {
                                    $project: {
                                        _id: 0,
                                        categoryName: 1,
                                    },
                                },
                            ],
                            as: 'category',
                        },
                    },
                ],
                metadata: [{ $count: 'totalBooks' }],
            },
        },
    ])
    return allBooks
}

//get one book
async function getOneBook(name, librarianId) {
    const findBook = await Book.findOne(
        { bookName: name },
        { addedBy: librarianId }
    )
        .populate('author')
        .populate('category')
    return findBook
}
//get one book
async function getOneBookById(id, librarianId) {
    const findBook = await Book.findOne({ _id: id }, { addedBy: librarianId })
        .populate('author')
        .populate('category')
    return findBook
}
//update the book
async function updateOneBook(id, bookData) {
    const editBook = await Book.findByIdAndUpdate({ _id: id }, bookData, {
        new: true,
    })
    return editBook
}
async function removeOneBook(id) {
    const removeBook = await Book.findByIdAndUpdate(
        { _id: id },
        { isDeleted: true },
        { new: true }
    )
    return removeBook
}
module.exports = {
    addBook,
    getBooks,
    getOneBook,
    getOneBookById,
    updateOneBook,
}
