// load .env file constant by process env by default
require("dotenv").config();

//import all required things
const express = require("express");
const cors = require("cors");
require("./src/config/db");
const routes = require("./src/routes/allRoutes");

//create server using express
const server = express();
//cors
server.use(cors());
//parse json to js content
server.use(express.json());
const logger = (req, res, next) => {
  console.log("API initialize");
  next()
};
//use routes in server
server.use(logger);
server.use(routes);


//error handling 
server.use((err,req,res,next)=>{
    res.status(500).json(err.message)
})

const PORT = process.env.PORT;
//start server to listen client request
server.listen(PORT, () => {
  console.log("Server starts");
});
//resolve API

