var express = require("express");
var router = express.Router();
const booksControllers = require("./../controllers/books");

router
  .route("/")
  .post(booksControllers.addBook) // Add a book
  .get(booksControllers.getBooks); // Get all books

router.get("/info", booksControllers);

router
  .route("/:bookId")
  .get(booksControllers.getBookById) // Get book by Id
  .put(booksControllers.updateBook) // Update book by Id
  .delete(booksControllers.deleteBook); // Delete book by Id

module.exports = router;
