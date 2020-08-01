import express from 'express';
import passport from 'passport';

import { loanBook } from '../controllers/loan';

const router = express.Router();

/**
 * @swagger
 * /loans:
 *  post:
 *    tags:
 *       - Loan API
 *    description: Use to loan book
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        type: string
 *        required: true
 *      - name: loanBookData
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/LoanBook'
 *    responses:
 *      '200':
 *        description: Book have been loaned successfully
 *      '500':
 *        description: Something went wrong
 */

router.post('', passport.authenticate('jwt', { session: false }), loanBook);

export default router;
