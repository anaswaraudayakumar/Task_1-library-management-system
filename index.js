// load .env file constant by process env by default
require('dotenv').config()

//import all required things
const express = require('express')
const cors = require('cors')
require('./src/config/db')
const routes=require('./src/routes/allRoutes')

//create server using express
const server =express()
//cors
server.use(cors())
//parse json to js content
server.use(express.json())
//use routes in server
server.use(routes)

const PORT = process.env.PORT
//start server to listen client request
server.listen(PORT,()=>{
    console.log('Server starts');
    
})
//resolve API 
