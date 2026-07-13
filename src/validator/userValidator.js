const MESSAGES = require("../constants/messages");
const {USERTYPES,PASSWORD_MIN_LENGTH,EMAILREGEX} = require("../constants/constants");
const STATUS_CODES = require("../constants/statusCodes");

function registerValidation(req, res, next) {
  console.log("Inside registervalidation");
  const { name, role, email, password } = req.body;
  if (!name || !role || !email || !password) {
    return res.status(STATUS_CODES.BAD_REQUEST).json(MESSAGES.INCOMPLETE_FORM);
  }
  //role
  if (role) {
    req.body.role = role.toLowerCase();
    if (!USERTYPES.includes(req.body.role)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json(MESSAGES.NOT_FOUND);
    }
  }
  //email regex checking

  if (!EMAILREGEX.test(email)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json(MESSAGES.INVALID_MAIL);
  }

  //password validation
  if (password.length < PASSWORD_MIN_LENGTH) {
    return res.status(STATUS_CODES.BAD_REQUEST).json(MESSAGES.INVALID_PASSWORD);
  }

  next();
}

function loginValidation(req, res, next) {
  console.log("inside Login validation");
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(STATUS_CODES.BAD_REQUEST).json(MESSAGES.INCOMPLETE_FORM);
  }
  //email regex checking

  if (!EMAILREGEX.test(email)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json(MESSAGES.INVALID_MAIL);
  }

  //password validation
  if (password.length < 6) {
    return res.status(STATUS_CODES.BAD_REQUEST).json(MESSAGES.INVALID_PASSWORD);
  }

  next();
}

module.exports = { registerValidation, loginValidation };
