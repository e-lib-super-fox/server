const { User } = require('./../models');

module.exports = function checkUserDuplication(req, res, next) {
  const { username, email } = req.body;
  const promises = [
    User.checkUsernameDuplication(username),
    User.checkEmailDuplication(email)
  ];

  Promise.all(promises)
    .then(results => {
      const errors = results.filter(result => result);
      if (errors.length === 0) {
        next();
      } else {
        res.status(400).json({ message: 'Signup failed', errors });
      }
    });
}