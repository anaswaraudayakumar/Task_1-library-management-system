const express = require('express')
const adminMiddleware = require('../middleware/adminMiddleware')
const authorController = require('../controller/authorController')
const stringValidator = require('../validator/stringValidator')

const authorRoute = express.Router()
//creating the author 
authorRoute.post("/authors",adminMiddleware,stringValidator,authorController.createAuthorController)
//get author
authorRoute.get("/",adminMiddleware,authorController.getAllAuthorController)

module.exports = authorRoute