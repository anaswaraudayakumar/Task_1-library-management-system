// load .env file constant by process env by default
require('dotenv').config()

//import all required things
const express = require('express')
const cors = require('cors')
require('./src/config/db')
const routes = require('./src/routes/allRoutes')
const responseTime = require('./src/middleware/resTimeMiddleware')
const responseHandler = require('./src/middleware/responseHandlerMiddleware')
const loggerRequest = require('./src/middleware/loggerMiddleware')
//create server using express
const server = express()
//cors
server.use(cors())
//parse json to js content
server.use(express.json())

//use routes in server
server.use(loggerRequest)

server.use(responseTime)
server.use(responseHandler)

server.use(routes)

//error handling
server.use((err, req, res, next) => {
    res.status(500).json(err.message)
})

const PORT = process.env.PORT
//start server to listen client request
server.listen(PORT, () => {
    console.log('Server starts')
})
//resolve API
