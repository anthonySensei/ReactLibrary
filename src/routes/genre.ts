import express from 'express';

import { getGenres } from '../controllers/genre';

const router = express.Router();

/**
 * @swagger
 * /genres:
 *  get:
 *    tags:
 *       - Genre API
 *    description: Use to fetch genres
 *    produces:
 *       - application/json
 *    responses:
 *      '200':
 *        description: Genres have been fetched successfully
 *      '500':
 *        description: Something went wrong
 */

router.get('', getGenres);

export default router;
