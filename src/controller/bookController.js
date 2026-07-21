const {
    createBookService,
    getAllBooksService,
} = require('../services/bookService')
const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../constants/constants')

async function createBookController(req, res) {
    console.log('Inside CreateBookController')

    try {
        const newBook = await createBookService(req.body, req.payload)
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.CREATED_SUCCESS,
            data: newBook,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
async function getAllBookController(req, res) {
    const librarianId = req.payload
    // console.log(librarianId);

    try {
        const bookData = await getAllBooksService(req.query, librarianId)
        const books = bookData[0].books
        const totalBooks = bookData[0].metadata[0]?.totalBooks
        const page = Number(req.query.page) || DEFAULT_PAGE
        const limit = Number(req.query.limit) || DEFAULT_LIMIT
        const totalPages = Math.ceil(totalBooks/limit)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.GET_ALL,
            data: books,
            metadata: {
                totalBooks,
                page,
                limit,
                totalPages
            },
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = { createBookController, getAllBookController }
