const Customer = require("../models/customerModel");
const bcrypt = require("bcryptjs");

// ============= tambahan npm install --save express-validator =========

const { check, validationResult } = require('express-validator/check');
var jwt = require('jsonwebtoken');

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
  let nameCustomer = req.body.userName;
  let pass = req.body.password;


  Customer.findOne({ userName: nameCustomer })
    .then(customers => {
      // console.log(customers.password);

      let compare = bcrypt.compareSync(pass, customers.password);
      console.log(compare);

      if (compare) {
        jwt.sign(
          { email: customers.email, id: customers._id, role: customers.role },
          process.env.SECRET_KEY,
          (err, token) => {
            res.status(200).json({ token });
          }
        );
      }
    })
    .catch(error => {
      res.status(400).json({ message: "wrong username/password" });
    });
}

module.exports = {
  signUpCustomer,
  loginCustomer
};
