const Book = require("./../models/book");

exports.addBook = (req, res) => {};

exports.getInfo = (req, res) => {};

exports.getBooks = (req, res) => {};
//========= put ======
exports.updateBook = (req, res) => {
  Book.findByIdAndUpdate()
    .then(book => {
      res.status(200).json({ message: "update book success" });
    })
    .catch(err => {
      res.status(400).json({ message: "update failed" });
    });
};
//========= delete ======
exports.deleteBook = (req, res) => {};

exports.getBookById = (req, res) => {};
