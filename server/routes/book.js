const express = require('express');
const router = express.Router();

const passport = require('passport');

const bookController = require('../controllers/book');

const links = require('../constants/links');

const booksDetailsUrl = links.BOOKS_DETAILS_URL;
const booksMoveUrl = links.BOOKS_MOVE_URL;

router.get('', bookController.getBooks);

router.get(booksDetailsUrl, bookController.getBook);

router.post(
    booksMoveUrl,
    passport.authenticate('jwt', { session: false }),
    bookController.moveBook
);

module.exports = router;
