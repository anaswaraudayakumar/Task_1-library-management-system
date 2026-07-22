const {
    addBook,
    getBooks,
    getOneBook,
    getOneBookById,
    updateOneBook,
    removeOneBook,
} = require('../repositories/bookRepository')

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
//get all book
async function getAllBooksService(query, id) {
    //id= librarianId
    const allBooks = await getBooks(query, id)

    // if (!allBooks.length) {
    //     throw new Error('There is no books as specified')
    // }

    return allBooks
}
//for viewing one book
async function getOneBookService(bookId, librarianId) {
    //id= librarianId
    const book = await getOneBookById(bookId, librarianId)
    if (!book) {
        throw new Error('There is no books as specified')
    }
    return book
}
//remove book
async function removeBookService(id, librarianId) {
    const existingBook = await getOneBookById(id, librarianId)
    if (!existingBook) {
        throw new Error("can't find that book")
    }
    const removeBook = await removeOneBook(id)
    return removeBook
}
// updateBook
async function updateBookService(id, librarianId, data) {
    const existingBook = await getOneBookById(id, librarianId)
    if (!existingBook) {
        throw new Error("can't find that book")
    }
    const updateBook = await updateOneBook(id, data)
    return updateBook
}

module.exports = {
    createBookService,
    getAllBooksService,
    getOneBookService,
    removeBookService,
    updateBookService,
}
