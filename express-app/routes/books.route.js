const express = require('express');
const { getBooks, findBookById } = require('../utils/db.function');

const bookRouter = express.Router();

// Get all books
bookRouter.get('/', (req, res) => {
  const books = getBooks();
  res.status(200).json(books);
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
    const { title, author, format } = req.body;
    const books = getBooks();
    const newBook = {
      id: books.length + 1,
      title,
      author,
      format,
    };
    books.push(newBook);
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(404).json({ error: 'Book not added' });
  }
});

// Edit a book
bookRouter.patch('/:id', (req, res) => {
  const { title, author, format } = req.body;

  // Parse the params.id as a number
  const book = findBookById(req.params.id);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  // Only the provided fields should be updated
  const updatedBook = {
    ...books[bookIndex],
    ...(title !== undefined && { title }),
    ...(author !== undefined && { author }),
    ...(format !== undefined && { format }),
  };
  res.status(200).json(updatedBook);
});

// Delete a books
bookRouter.delete('/:id', function (req, res) {
  const book = findBookById(req.params.id);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  books.splice(bookIndex, 1);

  // Should update the database here

  res.status(204).json({ message: 'Book deleted successfully' });
});

module.exports = bookRouter;
