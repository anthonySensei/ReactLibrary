import express from 'express';
import passport from 'passport';

import { LibrarianUrl } from '../constants/links';

import { getAllLibrarians } from '../controllers/librarian';

const router = express.Router();

/**
 * @swagger
 * /librarians/all:
 *  get:
 *    tags:
 *       - Librarian API
 *    description: Use to fetch all librarians
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: Librarians have been fetched successfully
 *      '500':
 *        description: Something went wrong
 */

router.get(
    LibrarianUrl.ALL,
    passport.authenticate('jwt', { session: false }),
    getAllLibrarians
);

export default router;
