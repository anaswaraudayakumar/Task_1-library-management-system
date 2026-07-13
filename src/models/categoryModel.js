const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports = mongoose.model("Category",categorySchema)