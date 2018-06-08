var express = require("express");
var router = express.Router();
const booksControllers = require("./../controllers/booksControllers");
const { multer, sendUploadToGCS } = require("./../helpers/files");
const { downloadFileFromGCS } = require("./../helpers/download.pdf");
var { auth, verifyTokenMiddleware } = require("../helpers/authorize");

router.post(
  "/add",
  verifyTokenMiddleware,
  auth,
  multer.fields([{ name: "file" }, { name: "image" }]),
  booksControllers.checkIsbn,
  sendUploadToGCS,
  booksControllers.addBook
); // Add a book

router.get("/", booksControllers.getBooks); // Get all books

router.get("/info", verifyTokenMiddleware, auth, booksControllers.getInfo);

router.get("/download", verifyTokenMiddleware, downloadFileFromGCS);

router
  .route("/:bookId")
  .get(booksControllers.getById) // Get book by Id
  .put(verifyTokenMiddleware,auth, booksControllers.updateBook) // Update book by Id
  .delete(verifyTokenMiddleware,auth, booksControllers.deleteBook); // Delete book by Id

module.exports = router;
