const {
    createBookService,
    getAllBooksService,
    removeBookService,
    updateBookService,
    getOneBookService,
} = require('../services/bookService')
const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')
const pagination = require('../utility/paginationFun')

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
        const { page, limit } = pagination(req.query)
        const totalPages = Math.ceil(totalBooks / limit)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.GET_ALL,
            data: books,
            metadata: {
                totalBooks,
                page,
                limit,
                totalPages,
            },
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}

//get one book by id
async function getOneBookController(req, res) {
    const librarianId = req.payload
    const { id } = req.params
    try {
        const book = await getOneBookService(id, librarianId)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.GET_ALL,
            data: book,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
async function updateBookcontroller(req, res) {
    const { id } = req.params
    const librarianId = req.payload
    try {
        const updateBook = await updateBookService(id, librarianId, req.body)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.EDIT,
            data: updateBook,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}

async function removeBookController(req, res) {
    const { id } = req.params

    try {
        const removeBook = await removeBookService(id)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.DELETE,
            data: removeBook,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    createBookController,
    getAllBookController,
    getOneBookController,
    removeBookController,
    updateBookcontroller,
}
