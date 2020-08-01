import express from 'express';
import passport from 'passport';

import { getBook, getBooks, moveBook } from '../controllers/book';

import { BookUrls } from '../constants/links';

const router = express.Router();

/**
 * @swagger
 * /books:
 *  get:
 *    tags:
 *       - Book API
 *    description: Use to fetch books
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: page
 *        in: query
 *        type: number
 *      - name: filter
 *        in: query
 *        type: string
 *      - name: value
 *        in: query
 *        type: string
 *      - name: authorId
 *        in: query
 *        type: string
 *      - name: fYear
 *        in: query
 *        type: number
 *      - name: tYear
 *        in: query
 *        type: number
 *      - name: page
 *        in: query
 *        type: string
 *      - name: departmentId
 *        in: query
 *        type: string
 *      - name: genres
 *        in: query
 *        type: Genre[]
 *    responses:
 *      '200':
 *        description: Books have been fetched successfully
 *      '500':
 *        description: Something went wrong
 */

router.get('', getBooks);

/**
 * @swagger
 * /books/details:
 *  get:
 *    tags:
 *       - Book API
 *    description: Use to fetch details about one book
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: bookId
 *        in: query
 *        type: number
 *    responses:
 *      '200':
 *        description: Book have been fetched successfully
 *      '500':
 *        description: Something went wrong
 */

router.get(BookUrls.DETAILS, getBook);

/**
 * @swagger
 * /books/move:
 *  post:
 *    tags:
 *       - Book API
 *    description: Use to move book from one department to another
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        type: string
 *        required: true
 *      - name: moveBookData
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/MoveBook'
 *    responses:
 *      '200':
 *        description: Book have been fetched successfully
 *      '500':
 *        description: Something went wrong
 */

router.post(
    BookUrls.MOVE,
    passport.authenticate('jwt', { session: false }),
    moveBook
);

export default router;
