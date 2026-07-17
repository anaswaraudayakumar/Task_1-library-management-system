const express = require('express')
const genValidator = require('../validator/genValidator')
const adminMiddleware = require('../middleware/adminMiddleware')
const bookController = require("../controller/bookController")
const bookRoute = express.Router()
const librarianMiddleware = require("../middleware/librarianMiddleware")

//add books
bookRoute.post("/books",librarianMiddleware,genValidator,bookController.createBookController)

module.exports = bookRoute