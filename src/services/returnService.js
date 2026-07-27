const { ACTIVE_STATUS, BORROW_STATUS } = require('../constants/constants')
const {
    updateOneBook,
    getOneBookById,
} = require('../repositories/bookRepository')
const {
    updateDetails,
    getOneDetail,
} = require('../repositories/borrowReturnRepository')

async function addReturnService(id) {
    const existBorrow = await getOneDetail(id)
    if (existBorrow.status == BORROW_STATUS[1]) {
        throw new Error('The book was Already returned')
    }
    const bookId = existBorrow.bookId
    const returnData = {
        returnDate: new Date(Date.now()),
        status: BORROW_STATUS[1],
    }
    //in borrowing
    const addReturn = await updateDetails(id, returnData)
    // in book
    const bookDetails = await getOneBookById(bookId)
    const activeBooks = bookDetails.activeBooks + 1
    let status = bookDetails.status
    if (status === ACTIVE_STATUS.inactive) {
        status = ACTIVE_STATUS.active
    }
    const bookData = {
        activeBooks,
        status,
    }
    //update the book details
    const newBookDetails = await updateOneBook(bookId, bookData)
    return {
        returnBook: newBookDetails,
        returnData: addReturn,
    }
}

module.exports = { addReturnService }
