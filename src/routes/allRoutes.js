const express = require('express')
const userRoute = require('./userRoute')
const authorRoute = require('./authorRoute')
const catRoute = require('./categoryRoute')
const bookRoute = require('./bookRoutes')

// to set up routes outside server
const router = new express.Router()

//user authentication 
router.use('/user',userRoute)
//author
router.use("/author",authorRoute)

//category
router.use("/category",catRoute)

//book
router.use("/book",bookRoute)

module.exports = router