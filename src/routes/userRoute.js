const express = require('express')
const userValidator = require('../validator/userValidator')
const userController = require('../controller/userController')
const adminMiddleware = require('../middleware/adminMiddleware')
const userRoute = express.Router()
//register
userRoute.post(
    '/register',
    userValidator.registerValidation,
    userController.registerController
)
// //login
// userRoute.post('/login',)
userRoute.post(
    '/login',
    userValidator.loginValidation,
    userController.loginController
)

// //alluser
// userRoute.get('/allUser')
userRoute.get('/', adminMiddleware, userController.getAllUserController)

//edit

userRoute.put('/:id', adminMiddleware, userController.userEditController)

// //deleteuser
// userRoute.delete('/:id',)

module.exports = userRoute
