const express = require('express')
const adminMiddleware = require('../middleware/adminMiddleware')
const authorController = require('../controller/authorController')
const genValidator = require('../validator/genValidator')

const authorRoute = express.Router()
//creating the author 
authorRoute.post("/authors",adminMiddleware,genValidator,authorController.createAuthorController)
//get author
authorRoute.get("/",adminMiddleware,authorController.getAllAuthorController)

module.exports = authorRoute