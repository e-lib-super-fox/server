const Book = require('./../models/book');
const axios = require('axios');

exports.addBook = (req, res) => {
  const objBook = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    file: req.file.cloudStoragePublicUrl
  };

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

  axios.get(url, {})
    .then(({data}) => {
      res.status(200).json({ message: 'Book info retrieved successfully', data })
    })
    .catch(err => {
      res.status(400).json({ message: 'Failed to retrieved book info', err })
    });
}

exports.getBooks = (req, res) => {
  Book.find()
    .then(books => {
      res.status(200).json({ message: 'Books retrieved successfully', books });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve books', err });
    });
}

exports.updateBook = (req, res) => {

}

exports.deleteBook = (req, res) => {
  
}

