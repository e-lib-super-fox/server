const Book = require("./../models/book");

exports.addBook = (req, res) => {};

exports.getInfo = (req, res) => {};

exports.getBooks = (req, res) => {};

//========= put ======
exports.updateBook =  (req, res) => {
  let id = req.params.bookId;
  let obj = {
    description: req.body.description
  };

  Book.findByIdAndUpdate(id, obj)
    .then(book => {
      res.status(200).json({ message: "update book success", book });
    })
    .catch(err => {
      res.status(400).json({ message: "update failed" });
    });
};

//========= delete ======
exports.deleteBook = (req, res) => {
  let id = req.params.bookId;
  Book.findByIdAndRemove(id)
    .then(book => {
      res.status(200).json({ message: "delete book success", book });
    })
    .then(err => {
      res.status(400).json({ message: "delete failed" });
    });
};

// ========== get one book =========
exports.getBookById = (req, res) => {
  Book.findById(req.params.bookId).then(book => {
    res.status(200).json({ message: "get one book success", book });
  });
};
