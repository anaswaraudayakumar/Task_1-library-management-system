const {
    createAuthorService,
    findAllAuthorService,
} = require('../services/authorService')
const MESSAGES = require('../constants/messages')
const STATUS_CODES = require('../constants/statusCodes')

async function createAuthorController(req, res) {
    console.log('Inside createAuthorController ')
    try {
        const author = await createAuthorService(req.body)
        res.success(MESSAGES.CREATED_SUCCESS, author, STATUS_CODES.CREATED)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
//getallauthor
async function getAllAuthorController(req, res) {
    console.log('Inside getAllAuthorController ')
    try {
        const author = await findAllAuthorService(req.query)
        res.success(MESSAGES.GET_ALL, author, STATUS_CODES.OK)
    } catch (error) {
        res.fail(error.message, STATUS_CODES.BAD_REQUEST)
    }
}
// async function updateController(req,res){
//     console.log("Inside getAllAuthorController ");
//     try {

//     } catch (error) {

//     }
// }

module.exports = { createAuthorController, getAllAuthorController }
