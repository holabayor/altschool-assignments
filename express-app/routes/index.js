const express = require('express');
const bookRouter = require('./books.route');
const authorRouter = require('./authors.route');

const router = express.Router();

router.use('/books', bookRouter);
router.use('/author', authorRouter);

module.exports = router;
