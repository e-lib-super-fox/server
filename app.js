const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// conecting database
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;

mongoose.connect(
  `mongodb://${mongoUser}:${mongoPass}@ds247670.mlab.com:47670/e-lib`
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to db");
});

const indexRouter = require("./routes/index");

// =========== ditambahin disini ================

const customersRouter = require('./routes/customer');
const booksRouter = require('./routes/books');

// =========== ditambahin disini ================

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// =========== ditambahin disini ================

app.use('/users',customersRouter)
app.use('/books',booksRouter)

// =========== ditambahin disini ================

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
