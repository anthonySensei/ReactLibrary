import express from 'express';
import passport from 'passport';

import { getStatistic, loanBook } from '../controllers/loan';
import { LoanUrls } from '../constants/links';

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

router.get(LoanUrls.STATISTIC, getStatistic);

export default router;
