import express from 'express';
import passport from 'passport';

import { orderBook } from '../controllers/order';

const router = express.Router();

/**
 * @swagger
 * /orders:
 *  post:
 *    tags:
 *       - Order API
 *    description: Use to order book
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        type: string
 *        required: true
 *      - name: orderBookData
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/OrderBook'
 *    responses:
 *      '200':
 *        description: Book have been ordered successfully
 *      '500':
 *        description: Something went wrong
 */

router.post('', passport.authenticate('jwt', { session: false }), orderBook);

export default router;
