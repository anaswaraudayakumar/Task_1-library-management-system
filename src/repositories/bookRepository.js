const Book = require("../models/bookModel")

//add book
async function addBook(bookData){
    const createBook = await Book.create(bookData)
    return createBook
}

//get all book
async function getBooks(query,librarianId){
    const filter ={ addedBy: librarianId}

    //filter using name
    if(query.bookName){
        filter.bookName= {$regex:query.bookName,$options:"i"}
    }
    //filter using category
    if(query.category){
        filter.category=query.category
    }
    //filter using author
    if(query.author){
        filter.author= query.author
    }
    //filter using language
    if(query.language){
        filter.language = query.language
    }
    const allBooks = await Book.find(filter).populate("author","authorName").populate("category","categoryName")
    return allBooks
}

//get one book
async function getOneBook(name,librarianId){
    const findBook = await Book.findOne({bookName:name},{addedBy:librarianId}).populate("author").populate("category")
    return findBook
}
//get one book
async function getOneBookById(id,librarianId){
    const findBook = await Book.findOne({_id:id},{addedBy:librarianId}).populate("author").populate("category")
    return findBook
}
//update the book 
async function updateOneBook(id,bookData){
    const editBook = await Book.findByIdAndUpdate({_id:id},bookData,{new:true})
}

module.exports = {addBook,getBooks,getOneBook,getOneBookById,updateOneBook}
