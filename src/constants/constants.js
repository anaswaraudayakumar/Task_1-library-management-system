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
    status: 'string',
    page: 'number',
    limit: 'number',
    bookId: 'id',
    memberId: 'id',
}
const ALLOWED_FIELD = [
    'bookName',
    'description',
    'language',
    'isbnNo',
    'pages',
    'totalCopies',
    'activeBooks',
    'status',
    ' publicationYear',
    'publisher',
    'author',
]

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 3
const BORROW_STATUS = { borrowed: 'borrowed', returned: 'returned' }
const ACTIVE_STATUS = { active: 'active', inactive: 'inactive' }
const FINE_STATUS = { paid: 'paid', unpaid: 'unpaid' }
const MAX_BORROW = 3
const FINE_PER_DAY = 5
const MAX_FINE = 50

module.exports = {
    EMAILREGEX,
    PASSWORD_MIN_LENGTH,
    USERTYPES,
    REGEX,
    SCHEMA,
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    ALLOWED_FIELD,
    BORROW_STATUS,
    ACTIVE_STATUS,
    MAX_BORROW,
    FINE_PER_DAY,
    MAX_FINE,
    FINE_STATUS,
}
