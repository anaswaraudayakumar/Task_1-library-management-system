

const MESSAGES= {
    //success
    REGISTER_SUCCESS : "Registered Successfully",
    LOGIN_SUCCESS :"User Logined Successfully",

    //validator messages
    INCOMPLETE_FORM:"All fields are required",
    NOT_FOUND:"cannot find the user",
    INVALID_MAIL:"Invalid Email format",
    INVALID_PASSWORD:"password must have 6 charecters ",
    STRING:"must be string",

    //updation response messages
    UPDATE_SUCCESS:"Updated successfully",
    //authorization 
    AUTH_FAIL :"Authorization failed.... Please Login ",
    INV_TOKEN:"Invalid Token.. Please Login",

    //author
    CREATED_SUCCESS :"Details added successfully",
    //
    GET_ALL:"All Details fetched successfully "

}
module.exports = MESSAGES;