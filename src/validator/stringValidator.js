const MESSAGES = require("../constants/messages");
const {USERTYPES,PASSWORD_MIN_LENGTH,EMAILREGEX} = require("../constants/constants");
const STATUS_CODES = require("../constants/statusCodes");

function stringValidator(req,res,next){
    console.log("Inside stringValidator");
    for (const key in req.body){
        const value = req.body[key]
        if(typeof value !=="string"){
            return res.status(STATUS_CODES.BAD_REQUEST).json({
            success:false,
            message: `${key} must be a string`
        })
        }
        if(value.trim() ===""){
          return res.status(STATUS_CODES.BAD_REQUEST).json({
            success:false,
            message: `${key} could not be empty`   
        })
        }
    }
    next()
}

module.exports = stringValidator 