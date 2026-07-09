const { registerUser, loginUser, updateUserByAdmin, getAllUsers } = require("../services/userService");
const MESSAGES = require("../constants/messages");
const STATUS_CODES = require("../constants/statusCodes");

async function registerController(req, res) {
  console.log("Inside register controller");
  try {
    const user = await registerUser(req.body);
    res.status(STATUS_CODES.CREATE).json({
      success: true,
      message: MESSAGES.REGISTER_SUCCESS,
    });
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json(error.message);
  }
}
async function loginController(req, res) {
  console.log("Inside loginController");
  try {
    const userInfo = await loginUser(req.body);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.LOGIN_SUCCESS,
      data: userInfo,
    });
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json(error.message);
  }
}
// user edit by admin controller
async function userEditController(req, res) {
  console.log("Inside  userEditController ");
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await updateUserByAdmin(id,userData)
    res.status(STATUS_CODES.OK).json({
        success:true,
        message:MESSAGES.UPDATE_SUCCESS,
        data:updatedUser
    })
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
        success:false,
        message:error.message
    })
  }
}

async function getAllUserController(req,res){
  console.log("Inside getAllUserController");
  try {
    const users = await getAllUsers(req.query)
    res.status(STATUS_CODES.OK).json({
        success:true,
        data:users
    })
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
        success:false,
        message:error.message
    })
  }

}


module.exports = { registerController, loginController,userEditController,getAllUserController };
