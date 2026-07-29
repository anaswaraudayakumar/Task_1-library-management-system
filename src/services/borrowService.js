const { ACTIVE_STATUS, BORROW_STATUS } = require('../constants/constants')
const {
    updateOneBook,
    getOneBookById,
} = require('../repositories/bookRepository')
const {
    addBorrow,
    getOneDetail,
    getAll,
    updateDetails,
} = require('../repositories/borrowReturnRepository')
const getDueDate = require('../utility/date')
const cacheService = require('./cacheService')

//borrowing
async function addBorrowService(id, data) {
    const { bookId, memberId } = data
    const key = `bookId-${bookId}`
    const librarianId = id

    let existBook = await cacheService.get(key)
    //if not
    if (!existBook) {
        existBook = await getOneBookById(bookId)
    }

    if (existBook.status == ACTIVE_STATUS.inactive) {
        console.log(existBook)
        throw new Error('There is no active copies now')
    } else {
        const newBorrow = await addBorrow({
            bookId,
            memberId,
            librarianId,
        })

        const activeBooks = existBook.activeBooks - 1
        let status
        if (activeBooks === 0) {
            status = ACTIVE_STATUS.inactive
            await cacheService.remove(key)
        } else {
            status = ACTIVE_STATUS.active
        }
        const bookData = { activeBooks, status }
        const newBook = await updateOneBook(bookId, bookData)
        const { bookName } = newBook
        const borrowData = { borrow: newBorrow, book: bookName }
        return borrowData
    }
}

//renewing
async function addRenewService(id) {
    //data have 2 id, bookId,borrowId
    //check the borrowing is exist or not
    const borrowDetails = await getOneDetail(id)

    if (!borrowDetails) {
        throw new Error('There is no such Id')
    }
    if (borrowDetails.status == BORROW_STATUS[1]) {
        throw new Error('Book Already returned')
    }

    const renewDate = new Date(Date.now())
    const dueDate = getDueDate()
    const data = { renewingDate: renewDate, dueDate }
    console.log(data)
    const renewService = await updateDetails(id, data)
    console.log(renewDate)

    return renewService
}

//list all borrowdetails
async function getAllService(query, librarianId) {
    const getAllDetails = await getAll(query, librarianId)
    return getAllDetails
}

// return

module.exports = {
    addBorrowService,
    addRenewService,
    getAllService,
}
