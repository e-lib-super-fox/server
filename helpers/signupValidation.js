// ============= tambahan npm install --save express-validator =========
const { check, validationResult } = require("express-validator/check");
// ============= tambahan npm install --save express-validator =========
var signUpVal = [
  check("username")
    .trim()
    .isLength({ min: 6 })
    .matches(/^\w+$/)
    .withMessage("Invalid username"),
  
  check("email")
    .isLength({ min: 1 })
    .trim()
    .isEmail()
    .withMessage("Invalid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Passwords must be at least 6 chars long")
];

module.exports = {
  signUpVal
};
