var express = require('express');
var router = express.Router();
const booksControllers = require('./../controllers/books');
const { multer, sendUploadToGCS  } = require('./../helpers/files')

router.route('/')
  .post(
    multer.single('file'),
    sendUploadToGCS,
    booksControllers.addBook) // Add a book
  .get(booksControllers.getBooks) // Get all books

router.get('/info', booksControllers.getInfo);

router.route('/:bookId')
  .get() // Get book by Id
  .put() // Update book by Id
  .delete() // Delete book by Id

module.exports = router;
