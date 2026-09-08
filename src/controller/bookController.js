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
        res.success(MESSAGES.CREATED_SUCCESS, newBook, STATUS_CODES.CREATED)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
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
        const data = {
            books,
            metadata: {
                totalBooks,
                page,
                limit,
                totalPages,
            },
        }
        res.success(MESSAGES.GET_ALL, data, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}

//get one book by id
async function getOneBookController(req, res) {
    const librarianId = req.payload
    const { id } = req.params
    try {
        const book = await getOneBookService(id, librarianId)
        
        res.success(MESSAGES.GET_ALL, book, STATUS_CODES.OK)

    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
async function updateBookcontroller(req, res) {
    const { id } = req.params
    const librarianId = req.payload
    try {
        const updateBook = await updateBookService(id, librarianId, req.body)
        res.success(MESSAGES.EDIT,updateBook,STATUS_CODES.OK)

    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}

async function removeBookController(req, res) {
    const { id } = req.params

    try {
        const removeBook = await removeBookService(id)
        res.success(MESSAGES.EDIT,removeBook,STATUS_CODES.OK)
        
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}

module.exports = {
    createBookController,
    getAllBookController,
    getOneBookController,
    removeBookController,
    updateBookcontroller,
}
