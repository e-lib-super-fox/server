var express = require("express");
var router = express.Router();
const {
  signUpCustomer,
  loginCustomer
} = require("../controllers/customerController");
var { auth } = require("../helpers/customerMiddlewares");

/* GET customer page. */
router.post("/signup", signUpCustomer).post("/signin", loginCustomer);

module.exports = router;
