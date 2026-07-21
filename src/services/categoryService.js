const {
    createCategory,
    findAllCategory,
    findOneById,
    findOneByName,
} = require('../repositories/categoryRepository')

async function createCategoryService(data) {
    const { categoryName, description } = data
    const existingCategory = await findOneByName(categoryName)
    if (existingCategory) {
        throw new Error(' Already exist')
    }
    const newCategory = await createCategory({ categoryName, description })
    return newCategory
}

async function getAllCategoryService() {
    console.log('Inside getAllCategory')
    const allCategory = await findAllCategory()
    if (!allCategory.length) {
        throw new Error('Category name not listed')
    }
    return allCategory
}

module.exports = { createCategoryService, getAllCategoryService }
