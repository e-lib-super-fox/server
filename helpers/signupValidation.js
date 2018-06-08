// ============= tambahan npm install --save express-validator =========
const { check, validationResult } = require("express-validator/check");
// ============= tambahan npm install --save express-validator =========
var signUpVal = [
  check("userName")
    .trim()
    .isLength({ min: 6 })
    .matches(/^\w+$/)
    .withMessage("invalid username"),
  
  check("email")
    .isLength({ min: 1 })
    .trim()
    .isEmail()
    .withMessage("invalid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("passwords must be at least 6 chars long")
];

module.exports = {
  signUpVal
};
