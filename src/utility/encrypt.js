const bcrypt = require('bcrypt')

async function  hashPassword(password){
    //encrypt password
    return await bcrypt.hash(password,10)
}

async function comparePassword(password,exsistingPassword){
    //compare
    return await bcrypt.compare(password,exsistingPassword)
}
module.exports = {hashPassword,comparePassword}
