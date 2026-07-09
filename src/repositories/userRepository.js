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
// get user by id
async function getOneById(id){
    const getOneUserById = await User.findById(id)
    return getOneUserById

}

//get all user or rolebased 
async function getAll(query){

    const filter = {}
    if (query.role) {
        filter.role = query.role
    }
    const allUsers= await User.find(filter)
    // console.log(allUsers);
    return allUsers
    
}
//edit user 
async function updateUserById (id,userData){
    const {name,role} = userData
    const updateUser = await User.findByIdAndUpdate({_id:id},{name,role},{new:true}).select("-password")
    return updateUser
}


//delete
async function deleteUser(userId){
    const deletedUser = await User.findByIdAndDelete(userId)
    return deletedUser
}

module.exports = {register,findByEmail,getOneById,getAll,updateUserById,deleteUser}