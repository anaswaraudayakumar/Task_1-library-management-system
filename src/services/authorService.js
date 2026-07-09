const {createAuthor,findAuthors,findAuthorByName,findAuthorById,update} = require("../repositories/authorRepository")

async function createAuthorService(authorData){
    const {authorName,biography,nationality} = authorData
    //check author details already in the db
    const existingAuthor= await findAuthorByName(authorName)
    if(existingAuthor){
        throw new Error("Author Already exist");
    }
    const newAuthor = await createAuthor({ authorName,biography,nationality })
    return newAuthor
}
//find all
async function findAllAuthorService(query){
    const allAuthor = await findAuthors(query)
    if(!allAuthor.length){
        throw new Error ("There is no author specifically")
    }
    return allAuthor
}
//update user service
async function updateAuthorService(id,authorData){
    //is author exist in db
    const author = await findAuthorById(id)
    if(!author){
        throw new Error ("There is no author details")
    }
    const updateAuthor={
        authorName:authorData.authorName,
        nationality:authorData.nationality
    }
    const updatedAuthor= await update(id,updateAuthor)
    return updatedAuthor
}


module.exports ={createAuthorService,findAllAuthorService}