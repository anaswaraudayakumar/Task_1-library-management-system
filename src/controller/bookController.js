const {createBookService} = require("../services/bookService")
const MESSAGES = require("../constants/messages");
const STATUS_CODES = require("../constants/statusCodes");

async function createBookController(req,res){
    console.log("Inside CreateBookController");
    try{
        const newBook = await createBookService(req.body)
        res.status(STATUS_CODES.CREATED).json({
            success:true,
            message:MESSAGES.CREATED_SUCCESS,
            data:newBook
        })
    }catch(error){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success:false,
            message:error.message
        })
    }
    
}

module.exports = {createBookController}