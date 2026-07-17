const Book = require("../models/bookModel")

//add book
async function addBook(bookData){
    const createBook = await Book.create(bookData)
    return createBook
}

//get all book
async function getBooks(query){
    const filter ={}
    //filter using name
    if(query.bookName){
        filter.bookName= query.bookName
    }
    //filter using category
    if(query.category){
        filter.category= query.category
    }
    //filter using author
    if(query.author){
        filter.author= query.author
    }
    //filter using language
    if(query.language){
        filter.language = query.language
    }
    const allBooks = await Book.find(filter).populate("librarianName","name")
}

//get one book
async function getOneBook(name){
    const findBook = await Book.findOne({bookName:name}).populate("author").populate("category")
    return findBook
}
//get one book
async function getOneBookById(id){
    const findBook = await Book.findOne(id).populate("author").populate("category")
    return findBook
}
//update the book 
async function updateOneBook(id,bookData){
    const editBook = await Book.findByIdAndUpdate({_id:id},bookData,{new:true})
}
module.exports = {addBook,getBooks,getOneBook,getOneBookById,updateOneBook}
