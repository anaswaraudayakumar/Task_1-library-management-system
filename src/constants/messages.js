

const MESSAGES= {
    //success
    REGISTER_SUCCESS : "Registered Successfully",
    LOGIN_SUCCESS :"User Logined Successfully",

    //validator messages
    INCOMPLETE_FORM:"All fields are required",
    NOT_FOUND:"cannot find the user",
    INVALID_MAIL:"Invalid Email format",
    INVALID_PASSWORD:"password must have 6 charecters ",
    

    //updation response messages
    UPDATE_SUCCESS:"Updated successfully",
    //authorization 
    AUTH_FAIL :"Authorization failed.... Please Login ",
    INV_TOKEN:"Invalid Token.. Please Login",

    //author
    AUTHOR_CRE_SUCCESS :"Author details added successfully",
    AUTHOR_GET_ALL:"Author details "

}
module.exports = MESSAGES;