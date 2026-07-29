const {
    addBook,
    getBooks,
    getOneBook,
    getOneBookById,
    updateOneBook,
    removeOneBook,
} = require('../repositories/bookRepository')
const cacheService = require('../services/cacheService')

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
    const key = `bookId-${newBook._id}`
    await cacheService.save(key, newBook)

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
    const key = `bookId-${bookId}`
    let book = await cacheService.get(key)
    console.log(book)

    if (!book) {
        book = await getOneBookById(bookId, librarianId)
        await cacheService.save(key, book)
    }

    if (!book) {
        throw new Error('There is no books as specified')
    }
    return book
}
//remove book
async function removeBookService(bookId, librarianId) {
    const key = `bookId-${bookId}`
    let book = await cacheService.get(key)
    if (!book) {
        book = await getOneBookById(bookId, librarianId)
    }
    if (!book) {
        throw new Error("can't find that book")
    }
    const removeBook = await removeOneBook(bookId)
    await cacheService.remove(key)
    return removeBook
}
// updateBook
async function updateBookService(bookId, librarianId, data) {
    const key = `bookId-${bookId}`
    let book = await cacheService.get(key)
    if (!book) {
        book = await getOneBookById(bookId, librarianId)
    }
    if (!book) {
        throw new Error("can't find that book")
    }
    const updateBook = await updateOneBook(bookId, data)
    await cacheService.save(key, book)
    return updateBook
}

module.exports = {
    createBookService,
    getAllBooksService,
    getOneBookService,
    removeBookService,
    updateBookService,
}
