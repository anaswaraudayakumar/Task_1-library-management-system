const express = require('express')
const userRoute = require('./userRoute')

// to set up routes outside server
const router = new express.Router()
//user authentication 
router.use('/user',userRoute)

module.exports = router