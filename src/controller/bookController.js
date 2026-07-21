const {
    createBookService,
    getAllBooksService,
} = require('../services/bookService')
const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')

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
        const books = await getAllBooksService(req.query, librarianId)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.GET_ALL,
            data: books,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = { createBookController, getAllBookController }
