const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN_LENGTH = 6
const USERTYPES = ['admin', 'member', 'librarian']
const REGEX = /^[A-Za-z0-9]/
const SCHEMA = {
    categoryName: 'string',
    bookName: 'string',
    description: 'string',
    language: 'string',
    isbnNo: 'string',
    pages: 'number',
    totalCopies: 'number',
    publicationYear: 'number',
    publisher: 'string',
    author: 'id',
    category: 'id',
    page: 'number',
    limit: 'number',
}
const DEFAULT_PAGE =1
const DEFAULT_LIMIT = 3
module.exports = { EMAILREGEX, PASSWORD_MIN_LENGTH, USERTYPES, REGEX, SCHEMA ,DEFAULT_PAGE,DEFAULT_LIMIT}
