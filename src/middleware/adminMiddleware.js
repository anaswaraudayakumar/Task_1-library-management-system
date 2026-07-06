const jwt = require("jsonwebtoken");
const STATUS_CODES = require("../constants/statusCodes");
const MESSAGES = require("../constants/messages");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    try {
      const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
      console.log(jwtResponse);
      req.payload = jwtResponse.email;
      const role = jwtResponse.role;
      if (role == "admin") {
        next();
      } else {
        res.status(STATUS_CODES.UN_AUTHORIZED).json(MESSAGES.INV_TOKEN);
      }
    } catch (error) {
      res.status(STATUS_CODES.UN_AUTHORIZED).json(MESSAGES.INV_TOKEN);
    }
  } else {
    //MESSAGES
    res.status(STATUS_CODES.UN_AUTHORIZED).json(MESSAGES.AUTH_FAIL);
  }
}
