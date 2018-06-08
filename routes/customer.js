var express = require("express");
var router = express.Router();
// ============= tambahan npm install --save express-validator =========
const { check, validationResult } = require("express-validator/check");
// ============= tambahan npm install --save express-validator =========

const {
  signUpCustomer,
  loginCustomer
} = require("../controllers/customerController");
var { auth } = require("../helpers/customerMiddlewares");
var { signUpVal } = require("../helpers/signupValidation");

/* GET customer page. */
router
  .post("/signup", signUpVal, signUpCustomer)
  .post("/signin", loginCustomer);

module.exports = router;
