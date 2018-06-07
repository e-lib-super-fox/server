var express = require('express');
var router = express.Router();
const booksControllers = require('./../controllers/books');
const { multer, sendUploadToGCS  } = require('./../helpers/files');
var { auth } = require("../helpers/customerMiddlewares");

router.route('/')
  .post(
    auth,
    multer.single('file'),
    sendUploadToGCS,
    booksControllers.addBook) // Add a book
  .get(auth, booksControllers.getBooks) // Get all books

router.get('/info', auth, booksControllers.getInfo);

router.route('/:bookId')
  .get(auth, booksControllers.getById) // Get book by Id
  .put(auth, booksControllers.updateBook) // Update book by Id
  .delete(auth, booksControllers.deleteBook) // Delete book by Id

module.exports = router;
