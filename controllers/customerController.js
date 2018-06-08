const Customer = require("../models/customerModel");
const bcrypt = require("bcryptjs");

// ============= tambahan npm install --save express-validator =========

const { check, validationResult } = require("express-validator/check");
var jwt = require("jsonwebtoken");

// ============= tambahan npm install --save express-validator =========

function signUpCustomer(req, res) {
  // ============ add validations ============
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // ============ add validations ============

  let objCustomer = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  Customer.create(objCustomer)
    .then(customers => {
      res.status(200).json({ message: "signup success", customers });
    })
    .catch(error => {
      res.status(400).json({ message: "signup error" });
    });
}

function loginCustomer(req, res) {

  let user = req.body.user;
  let pass = req.body.password;


  //======== login with username or email =============

  var isEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(user);

  let field = 'userName';
  if (isEmail) {
    field = 'email';
  }
  
//======== login with username or email =============

  Customer.findOne({ [field]: user })
    .then(customer => {
      console.log(customer);

      let compare = bcrypt.compareSync(pass, customer.password);

      if (compare) {
        jwt.sign(
          { userName: customer.userName, email: customer.email, id: customer._id, role: customer.role },
          process.env.SECRET_KEY,
          (err, token) => {
            res.status(200).json({ message: 'Logged In Successfully', token });
          }
        );
      }
    })
    .catch(error => {
      res.status(400).json({ message: "wrong username/password", error });
    });
}

module.exports = {
  signUpCustomer,
  loginCustomer
};
