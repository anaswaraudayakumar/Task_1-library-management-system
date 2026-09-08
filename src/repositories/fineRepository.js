const { default: mongoose } = require('mongoose')
const Fine = require('../models/fineModel')

async function createFine(fineData) {
    return await Fine.create(fineData)
}
//findAll
async function findAllFine(id) {
    const filter = {
        memberId: new mongoose.Types.ObjectId(id),
        fineStatus: 'unpaid',
    }
    const getAll = await Fine.find(filter)
    const fine = getAll.reduce((acc, curr) => {
        return acc + curr.fineAmount
    }, 0)
    const data = {
        getAll,
        fine,
    }
    return data
}
//findOne
async function getOne(borrowId) {
    const fineData = await Fine.findOne({ borrowId })
    return fineData
}
//findOne by id
async function getOneId(id) {
    return await Fine.findById(id)
}
//find one and update for
async function updateFine(id, data) {
    const updateFine = await Fine.findByIdAndUpdate({ _id: id }, data, {
        returnDocument: 'after',
    })

    return updateFine
}

module.exports = { createFine, findAllFine, updateFine, getOne, getOneId }
