var express = require("express");
var router = express.Router();

const {
  signUpUser,
  loginUser,
  verifyToken
} = require("../controllers/usersControllers");
var { auth } = require("../helpers/authorize");
var { signUpVal } = require("../helpers/signupValidation");
const checkUserDuplication = require('./../helpers/checkUserDuplication');

/* GET customer page. */
router
  .post("/signup", signUpVal,checkUserDuplication, signUpUser)
  .post("/signin", loginUser)
  .post("/verify", verifyToken);

module.exports = router;
