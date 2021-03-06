const Book = require("./../models/book");
const axios = require("axios");

exports.checkIsbn = (req, res, next) => {
  Book.checkIsbnDuplication(req.body.isbn)
    .then(duplication => {
      if (duplication) {
        res.status(400).json({ message: 'ISBN is already exists' });
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error', err })
    })
}

exports.addBook = (req, res) => {
  const [ pdfFile ] = req.uploaded.filter(file => file.fieldname === 'file' );
  const [ imageFile ] = req.uploaded.filter(file => file.fieldname === 'image' );

  const objBook = {
    isbn: req.body.isbn,
    title: req.body.title,
    authors: req.body.authors,
    description: req.body.description,
    file: pdfFile.cloudStoragePublicUrl,
    filename: pdfFile.cloudStorageObject,
    image: imageFile ? imageFile.cloudStoragePublicUrl : req.body.imageUrl,
    uploader: req.user.id
  };

  Book.create(objBook)
    .then(book => {
      res.status(200).json({ message: "Book added successfully", book });
    })
    .catch(err => {
      res.status(400).json({ message: "Add book failed", err});
    });
};

exports.getInfo = (req, res) => {
  const isbn = req.query.isbn;
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${
    process.env.GOOGLE_API_KEY
  }`;

  console.log('hit');

  axios
    .get(url, {})
    .then(({ data }) => {
      let bookInfo = {
        title: '',
        author: [],
        description: '',
        image: 'https://storage.googleapis.com/e-lib/1528390467556placeholder.jpg'
      };
      if (data.totalItems > 0) {
        const item = data.items[0];
        bookInfo.title = item.volumeInfo.title;
        bookInfo.authors = item.volumeInfo.authors;
        bookInfo.description = item.volumeInfo.description;
        bookInfo.image = item.volumeInfo.imageLinks.thumbnail;
      } 
      res
      .status(200)
      .json({ message: "Book info retrieved successfully", bookInfo });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieved book info", err });
    });
};

exports.getBooks = (req, res) => {
  Book.find()
    .then(books => {
      res.status(200).json({ message: "Books retrieved successfully", books });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve books", err });
    });
};

//========= put ======
exports.updateBook = (req, res) => {
  let id = req.params.bookId;
  let obj = {
    description: req.body.description
  };

  Book.findByIdAndUpdate(id, obj)
    .then(book => {
      res.status(200).json({ message: "update book success" });
    })
    .catch(err => {
      res.status(400).json({ message: "update failed" });
    });
};

// ======== delete ===========
exports.deleteBook = (req, res) => {
  let id = req.params.bookId;
  Book.findByIdAndRemove(id)
    .then(book => {
      res.status(200).json({ message: "delete book success" });
    })
    .catch(err => {
      res.status(400).json({ message: "delete failed" });
    });
};
//============ get by id =================
exports.getById = (req, res) => {
  let id = req.params.bookId;
  Book.findById(id)
    .then(book => {
      res.status(200).json({ message: "get book success", book });
    })
    .catch(err => {
      res.status(400).json({ message: "get book failed", err });
    });
};
