const fs = require('fs');

const getBooks = () => {
  try {
    const rawText = fs.readFileSync('./data/books.json', { encoding: 'utf8' });
    return JSON.parse(rawText);
  } catch (error) {
    console.error('Error reading data', error);
    return;
  }
};

const findBookById = (id) => {
  const books = getBooks();
  const bookIndex = books.findIndex((book) => book.id === Number(id));
  return books[bookIndex];
};

const saveBooks = (books) => {
  try {
    const rawText = JSON.stringify(books, undefined, 2);
    fs.writeFileSync('./data/books.json', rawText, { encoding: 'utf8' });
  } catch (error) {
    console.error('Error saving books', error);
  }
};

module.exports = { getBooks, findBookById, saveBooks };
