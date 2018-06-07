var express = require('express');
var router = express.Router();
const booksControllers = require('./../controllers/books');

router.route('/')
  .post(booksControllers.addBook) // Add a book
  .get(booksControllers.getBooks) // Get all books

router.get('/info', booksControllers)

router.route('/:bookId')
  .get() // Get book by Id
  .put() // Update book by Id
  .delete() // Delete book by Id

module.exports = router;
