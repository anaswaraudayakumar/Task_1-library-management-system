const User = require("../models/userModel")

//create user
async function register(userData){
    return await User.create(userData)
}

//get user by mail for login 
async function findByEmail(email){
    const getOneUser = await User.findOne({email})
    return getOneUser
}

//get all user
async function getAll(){
    const allUsers= await User.find()
    console.log(allUsers);
    return allUsers
    
}
//delete
async function deleteUser(userId){
    const deletedUser = await User.findByIdAndDelete(userId)
    return deletedUser
}

module.exports = {register,findByEmail,getAll,deleteUser}