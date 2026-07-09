const express = require('express')
const userRoute = require('./userRoute')
const authorRoute = require('./authorRoute')

// to set up routes outside server
const router = new express.Router()
//user authentication 
router.use('/user',userRoute)
router.use("/author",authorRoute)


module.exports = router