const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

let userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: "Username is required"
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Email is required"
    },
    password: {
      type: String,
      required: "Password is required"
    },
    role: {
      type: String,
      default: "user"
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.statics.checkUsernameDuplication = function(username) {
  return this.findOne({ username })
    .then(user => {
      if (user) return { username: 'Username already exists'};
      return null;
    })
    .catch(err => {
      throw err;
    });
};

userSchema.statics.checkEmailDuplication = function(email) {
  return this.findOne({ email })
    .then(user => {
      if (user) return { email: 'Email already exists'};
      return null;
    })
    .catch(err => {
      throw err;
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
