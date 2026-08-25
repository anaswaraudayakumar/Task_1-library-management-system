const {
    createFine,
    getOne,
    updateFine,
    findAllFine,
    getOneId,
} = require('../repositories/fineRepository')
const finePerDay = require('../utility/fine')

//paying fine amount and update the fine status: false it will remove fine status
async function addFineService(data) {
    //destructure data
    const { borrowId, memberId, librarianId, dueDate } = data

    //check fine exist or not
    const existingFine = await getOne(borrowId)
    console.log(existingFine)

    const fineAmount = finePerDay(dueDate)
    // if there is fine then update the fine per date
    if (existingFine) {
        // fine amount return
        const newFine = await updateFine(existingFine._id, {
            fineAmount,
            fineStatus: 'unpaid',
        })
        console.log(newFine)

        return newFine
    }
    //else newFine added
    const newFIneDetails = await createFine({
        borrowId,
        memberId,
        librarianId,
        fineAmount,
    })
    return newFIneDetails
}

//get all fine by member
async function getAllFineService(memberId) {
    const findAll = await findAllFine(memberId)
    return findAll
}

// payment of fine
async function finePayService(fineId) {
    const existingFine = await getOneId(fineId)
    if (!existingFine) {
        throw new Error('FineId is not correct')
    }
    if (existingFine.fineStatus === 'paid') {
        throw new Error('Fine is already paid')
    }
    const data = { fineAmount: 0, fineStatus: 'paid' }
    const finePay = await updateFine(fineId, data)
    return finePay
}

module.exports = { addFineService, getAllFineService, finePayService }
