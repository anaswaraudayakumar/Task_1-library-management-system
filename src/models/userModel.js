const mongoose = require("mongoose")
const {userType} = require("../constants/constants")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        lowercase:true,
        enum:{values:userType},
        default :"member"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: 6

    }
    
},{timestamps:true})

module.exports= mongoose.model("User",userSchema)