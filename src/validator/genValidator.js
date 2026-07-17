const { SCHEMA } = require("../constants/constants");
const validator = require("../utility/validatorFun");
const STATUS_CODES = require("../constants/statusCodes");


function genValidator(req,res,next){
      const error =validator(req,SCHEMA)
      if(error){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success:false,
            message:error
        })
      }
      next()
}
module.exports = genValidator