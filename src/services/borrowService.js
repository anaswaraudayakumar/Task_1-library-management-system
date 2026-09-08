const {
    ACTIVE_STATUS,
    BORROW_STATUS,
    MAX_BORROW,
    MAX_FINE,
} = require('../constants/constants')
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
const { findAllFine } = require('../repositories/fineRepository')
const getDueDate = require('../utility/date')
const cacheService = require('./cacheService')
const { addFineService } = require('./fineService')
const cacheKey = require('../utility/cacheKey')
//borrowing
async function addBorrowService(id, data) {
    const { bookId, memberId } = data
    // key for cache
    const key = cacheKey.book(bookId)

    const librarianId = id
    const borrowed = await getAll(
        { memberId: memberId, status: BORROW_STATUS.borrowed },
        librarianId
    )
    // borrow length exceed
    if (borrowed.length >= MAX_BORROW) {
        throw new Error('The user is out of borrow')
    }

    const fineStatus = await findAllFine(memberId)
    console.log(fineStatus)

    // if
    if (fineStatus.fine >= MAX_FINE) {
        throw new Error('The user Exceed fine limit ')
    }

    let existBook = await cacheService.get(key)
    //if not
    if (!existBook) {
        existBook = await getOneBookById(bookId)
    }

    if (existBook.status == ACTIVE_STATUS.inactive) {
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
    //data id=borrowId
    //check the borrowing is exist or not
    const borrowDetails = await getOneDetail(id)

    if (!borrowDetails) {
        throw new Error('There is no such Id')
    }

    const { memberId, librarianId, dueDate, status } = borrowDetails
    const renewDate = new Date()

    if (status == BORROW_STATUS.returned) {
        throw new Error('Book Already returned')
    }

    //fine
    if (dueDate < renewDate) {
        // here call fineRepository for add fine
        await addFineService({ borrowId: id, memberId, librarianId, dueDate })
        throw new Error('book is already in over Due ')
    }
    const newDueDate = getDueDate()
    const data = { renewingDate: renewDate, dueDate: newDueDate }
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
