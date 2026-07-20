const express = require('express')
const adminMiddleware = require('../middleware/adminMiddleware')
const categoryController = require('../controller/categoryController')
const genValidator = require('../validator/genValidator')

const catRoute = express.Router()

//add category
catRoute.post("/categories",adminMiddleware,genValidator,categoryController.createController)
//get all type
catRoute.get("/",adminMiddleware,categoryController.getAllController)
module.exports = catRoute
