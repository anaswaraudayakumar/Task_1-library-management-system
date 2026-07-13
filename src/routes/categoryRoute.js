const express = require('express')
const adminMiddleware = require('../middleware/adminMiddleware')
const categoryController = require('../controller/categoryController')
const stringValidator = require('../validator/stringValidator')

const catRoute = express.Router()

catRoute.post("/categories",adminMiddleware,stringValidator,categoryController.createController)
catRoute.get("/",adminMiddleware,categoryController.getAllController)
module.exports = catRoute
