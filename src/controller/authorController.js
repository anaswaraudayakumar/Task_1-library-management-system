const {
    createAuthorService,
    findAllAuthorService,
} = require('../services/authorService')
const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')
const { getAll } = require('../repositories/userRepository')

async function createAuthorController(req, res) {
    console.log('Inside createAuthorController ')
    try {
        const author = await createAuthorService(req.body)
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.CREATED_SUCCESS,
            data: author,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
//getallauthor
async function getAllAuthorController(req, res) {
    console.log('Inside getAllAuthorController ')
    try {
        const author = await findAllAuthorService(req.query)
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.GET_ALL,
            data: author,
        })
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: error.message,
        })
    }
}
// async function updateController(req,res){
//     console.log("Inside getAllAuthorController ");
//     try {

//     } catch (error) {

//     }
// }

module.exports = { createAuthorController, getAllAuthorController }
