// ============= tambahan npm install --save express-validator =========
const { check, validationResult } = require("express-validator/check");
// ============= tambahan npm install --save express-validator =========
var signUpVal = [
  check("email")
    .isEmail()
    .withMessage("must be an email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("passwords must be at least 6 chars long")
];

module.exports = {
  signUpVal
};
