const express = require('express')
const genValidator = require('../validator/genValidator')
const librarianMiddleware = require('../middleware/librarianMiddleware')
// const adminMiddleware = require('../middleware/adminMiddleware')
const borrowController = require('../controller/borrowController')
const {
    returnController,
    fineController,
    getAllFineController,
} = require('../controller/returnController')

const borrowRoute = express.Router()

//add borrow
borrowRoute.post(
    '/',
    genValidator,
    librarianMiddleware,
    borrowController.createBorrowController
)

//get all
borrowRoute.get(
    '/',
    genValidator,
    librarianMiddleware,
    borrowController.getAllController
)

//add renew
borrowRoute.put('/:id', librarianMiddleware, borrowController.renewController)

//return
borrowRoute.put('/return/:id', librarianMiddleware, returnController)

//fine
borrowRoute.put('/fine/:id', librarianMiddleware, fineController)

//get all fine by
borrowRoute.get(
    '/fine',
    genValidator,
    librarianMiddleware,
    getAllFineController
)

module.exports = borrowRoute
