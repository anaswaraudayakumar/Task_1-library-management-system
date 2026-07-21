const { hashPassword, comparePassword } = require('../utility/encrypt')
const {
    register,
    findByEmail,
    updateUserById,
    getAll,
    getOneById,
} = require('../repositories/userRepository')
const jwt = require('jsonwebtoken')

async function registerUser(userData) {
    const { name, role, email, password } = userData

    const existingUser = await findByEmail(email)
    if (existingUser) {
        throw new Error('User Already exist')
    } else {
        let encryptPassword = await hashPassword(password)
        const newUser = await register({
            name,
            role,
            email,
            password: encryptPassword,
        })
        return newUser
    }
}

async function loginUser(userData) {
    const { email, password } = userData
    const existingUser = await findByEmail(email)

    console.log('Inside loginUser')
    if (!existingUser) {
        throw new Error('User Not Found')
    }
    const checkPassword = await comparePassword(password, existingUser.password)
    if (!checkPassword) {
        throw new Error('incorrect credentials')
    }
    const token = jwt.sign(
        { id: existingUser._id, role: existingUser.role },
        process.env.JWT_SECRET
    )

    const userInfo = {
        user: {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
        },
        token,
    }
    return userInfo
}

// function for user edit by admin
async function updateUserByAdmin(id, userData) {
    console.log('inside the updateUser')
    const user = await getOneById(id)
    if (!user) {
        throw new Error('User not Found')
    }
    const updateData = {
        name: userData.name,
        role: userData.role,
    }
    const updatedUser = await updateUserById(id, updateData)
    return updatedUser
}
async function getAllUsers(query) {
    console.log('Inside the  getAllUserController')
    const allUser = await getAll(query)
    if (!allUser.length) {
        throw new Error('There is no such user')
    }
    return allUser
}

module.exports = { registerUser, loginUser, updateUserByAdmin, getAllUsers }
