const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const bookSchema = new Schema({
  isbn: {
    type: String,
    trim: true,
    unique: true,
    required: 'ISBN is required'
  },
  title: {
    type: String,
    trim: true,
    required: 'Title is required'
  },
  authors: {
    type: String,
    trim: true,
    required: 'Author is required'
  },
  description: {
    type: String,
    trim: true,
  },
  file: {
    type: String
  },
  filename: {
    type: String
  },
  image: {
    type: String
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  }
}, { timestamps: true });

bookSchema.statics.checkIsbnDuplication = function(isbn) {
  return this.findOne({ isbn: isbn })
    .then(book => {
      if (book) return true
      else return false;
    })
    .catch(err => {
      throw err
    });
}

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;