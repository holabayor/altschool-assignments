const express = require('express');
const { getBooks, findBookById, saveBooks } = require('../utils/db.function');

const bookRouter = express.Router();

// Get all books
bookRouter.get('/', (req, res) => {
  const books = getBooks();
  res.status(200).json({
    message: 'Books fetched successfully',
    metadata: {
      size: books.length,
    },
    books,
  });
});

// Get a specific book by Id
bookRouter.get('/:id', (req, res) => {
  const book = findBookById(req.params.id);
  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  res.status(200).json(book);
});

// Add a new book
bookRouter.post('/', (req, res) => {
  try {
    const { title, author, format, pages } = req.body;
    const books = getBooks();
    const newBook = {
      id: books.length + 1,
      title,
      author,
      format,
      pages,
    };
    books.push(newBook);
    saveBooks(books);
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(404).json({ error: 'Book not added' });
  }
});

// Edit a book
bookRouter.patch('/:id', (req, res) => {
  const { title, author, pages, format } = req.body;

  // Parse the params.id as a number
  const book = findBookById(req.params.id);
  const books = getBooks();

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  // Find index of the book to be updated
  const index = books.findIndex((book) => book.id === Number(req.params.id));

  // Only the provided fields should be updated
  const updatedBook = {
    ...book,
    ...(title !== undefined && { title }),
    ...(author !== undefined && { author }),
    ...(pages !== undefined && { pages }),
    ...(format !== undefined && { format }),
  };

  books[index] = updatedBook;
  saveBooks(books);
  res
    .status(200)
    .json({ message: 'Book updated successfully', book: updatedBook });
});

// Delete a books
bookRouter.delete('/:id', function (req, res) {
  const book = findBookById(req.params.id);
  const books = getBooks();

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  const bookIndex = books.findIndex(
    (book) => book.id === Number(req.params.id)
  );
  books.splice(bookIndex, 1);
  saveBooks(books);

  res.status(204).json({ message: 'Book deleted successfully' });
});

module.exports = bookRouter;
