const {registerUser,loginUser} = require("../services/authService")
const MESSAGES = require("../constants/messages")
const STATUS_CODES = require("../constants/statusCodes")

async function registerController(req,res){
    console.log("Inside register controller");
    try {
        const user = await registerUser(req.body)
        res.status(status_codes.OK).json({
            success:true,
            message: MESSAGES.REGISTER_SUCCESS
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json(error.message)
    }
    
}
async function loginController(req,res){
    console.log("Inside loginController");
    try {
        const userInfo = await loginUser(req.body)
        
        res.status(status_codes.OK).json({
            success:true,
            message:MESSAGES.LOGIN_SUCCESS,
            data:userInfo

        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json(error.message)
        
    }

}
module.exports = {registerController, loginController}