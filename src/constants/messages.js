

const MESSAGES= {
    //success
    REGISTER_SUCCESS : "User Registered Successfully",
    LOGIN_SUCCESS :"User Logined Successfully",

    //validator messages
    INCOMPLETE_FORM:"All fields are required",
    NOT_FOUND:"cannot find the user",
    INVALID_MAIL:"Invalid Email format",
    INVALID_PASSWORD:"password must have 6 charecters ",

    //authorization 
    AUTH_FAIL :"Authorization failed.... Please Login ",
    INV_TOKEN:"Invalid Token.. Please Login"
}
module.exports = MESSAGES;