import express from 'express';
import passport from 'passport';

import { getBook, getBooks, moveBook } from '../controllers/book';

import { BookUrls } from '../constants/links';

const router = express.Router();

router.get('', getBooks);

router.get(BookUrls.DETAILS, getBook);

router.post(
    BookUrls.MOVE,
    passport.authenticate('jwt', { session: false }),
    moveBook
);

export default router;
