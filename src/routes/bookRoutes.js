const express = require('express')
const genValidator = require('../validator/genValidator')
const bookController = require('../controller/bookController')
const bookRoute = express.Router()
const librarianMiddleware = require('../middleware/librarianMiddleware')
const fieldValidator = require('../validator/fieldValidator')

//librarian Middleware
bookRoute.use(librarianMiddleware)
//add books
bookRoute.post('/books', genValidator, bookController.createBookController)
//get books\
bookRoute.get('/', genValidator, bookController.getAllBookController)
//get one book by id
bookRoute.get('/:id', genValidator, bookController.getOneBookController)
//updateBook
bookRoute.put(
    '/:id',
    fieldValidator,
    genValidator,
    bookController.updateBookcontroller
)
//remove book
bookRoute.delete('/:id', bookController.removeBookController)
module.exports = bookRoute
