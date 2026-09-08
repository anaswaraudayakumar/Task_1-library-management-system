const { ACTIVE_STATUS, BORROW_STATUS } = require('../constants/constants')
const {
    updateOneBook,
    getOneBookById,
} = require('../repositories/bookRepository')
const {
    updateDetails,
    getOneDetail,
} = require('../repositories/borrowReturnRepository')
const { addFineService } = require('./fineService')

async function addReturnService(borrowId) {
    //get one borrow details
    const existBorrow = await getOneDetail(borrowId)
    const { memberId, librarianId, dueDate, status } = existBorrow
    if (status == BORROW_STATUS.returned) {
        throw new Error('The book was Already returned')
    }

    const bookId = existBorrow.bookId
    const returnDate = new Date()

    const returnData = {
        returnDate,
        status: BORROW_STATUS.returned,
    }
    //check dueDate
    let fineDetails = 0

    if (returnDate > dueDate) {
        // here fineREpository for add fine
        fineDetails = await addFineService({
            borrowId,
            memberId,
            librarianId,
            dueDate,
        })
    }
    //in borrowing
    const addReturn = await updateDetails(borrowId, returnData)
    // in book
    const bookDetails = await getOneBookById(bookId)
    const activeBooks = bookDetails.activeBooks + 1
    const bookStatus = ACTIVE_STATUS.active

    const bookData = {
        activeBooks,
        status: bookStatus,
    }
    //update the book details
    const newBookDetails = await updateOneBook(bookId, bookData)
    return {
        returnBook: newBookDetails,
        returnData: addReturn,
        fine: fineDetails,
    }
}

module.exports = { addReturnService }
