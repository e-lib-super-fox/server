const Book = require('./../models/book');

exports.addBook = (req, res) => {
  const objBook = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    file: req.file.cloudStoragePublicUrl
  }

  Book.create(objBook)
    .then(book => {
      res.status(200).json({ message: "Book added successfullt", book });
    })
    .catch(err => {
      res.status(400).json({ message: "Add book failed" });
    });
}

exports.getInfo = (req, res) => {
  const isbn = req.query.isbn;
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_API_KEY}`;

  
}

exports.getBooks = (req, res) => {

}

exports.updateBook = (req, res) => {

}

exports.deleteBook = (req, res) => {
  
}

