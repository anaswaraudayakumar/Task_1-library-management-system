const { findAuthorById } = require("../repositories/authorRepository")
const {addBook,getBooks,getOneBook,getOneBookById,updateOneBook} = require("../repositories/bookRepository")
const { findOneById } = require("../repositories/categoryRepository")

async function createBookService(data){
   const {bookName,author,description,category,language,isbnNo,pages,totalCopies,publicationYear,publisher,addedBy} =data
   const existingBook = await getOneBook(bookName)
   if(existingBook){
    throw new Error("Already Exist ")
   }
//    const isAuthor = await findAuthorById(author)
//    const isCategory= await findOneById(category)
//    if(!isAuthor){
//         throw new Error("There Is no author listed in this name")
//    }
//    if(!isCategory){
//     throw new Error("There is no category as mentioned")
//    }
   
   const newBook = await addBook({bookName,author,description,category,language,isbnNo,pages,totalCopies,publicationYear,publisher,addedBy})
   return newBook
}

module.exports = {createBookService}