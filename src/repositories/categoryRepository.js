const Category = require('../models/categoryModel')

//create
async function createCategory(data) {
    return await Category.create(data)
}

//findAll
async function findAllCategory() {
    return await Category.find().select('-__v')
}
//find by id
async function findOneById(id) {
    const getOne = await Category.findById(id)
    return getOne
}
async function findOneByName(categoryName) {
    const getOne = await Category.findOne({ categoryName })
    return getOne
}

module.exports = {
    createCategory,
    findAllCategory,
    findOneById,
    findOneByName,
}
