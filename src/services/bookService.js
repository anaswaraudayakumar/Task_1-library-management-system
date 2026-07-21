const { findAuthorById } = require('../repositories/authorRepository')

const {
    addBook,
    getBooks,
    getOneBook,
    getOneBookById,
    updateOneBook,
} = require('../repositories/bookRepository')
const { findOneById } = require('../repositories/categoryRepository')

async function createBookService(data, librarianId) {
    const {
        bookName,
        author,
        description,
        category,
        language,
        isbnNo,
        pages,
        totalCopies,
        activeBooks,
        publicationYear,
        publisher,
    } = data
    const addedBy = librarianId

    const existingBook = await getOneBook(bookName, librarianId)
    if (existingBook) {
        throw new Error('Already Exist')
    }
    //    const isAuthor = await findAuthorById(author)
    //    const isCategory= await findOneById(category)
    //    if(!isAuthor){
    //         throw new Error("There Is no author listed in this name")
    //    }
    //    if(!isCategory){
    //     throw new Error("There is no category as mentioned")
    //    }

    const newBook = await addBook({
        bookName,
        author,
        description,
        category,
        language,
        isbnNo,
        pages,
        totalCopies,
        activeBooks,
        publicationYear,
        publisher,
        addedBy,
    })
    return newBook
}

async function getAllBooksService(query, id) {
    //id= librarianId
    const allBooks = await getBooks(query, id)
    
    if (!allBooks.length) {
        throw new Error('There is no books as specified')
    }
    
    return allBooks
}

module.exports = { createBookService, getAllBooksService }
