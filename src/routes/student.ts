import express from 'express';
import passport from 'passport';

const router = express.Router();

import { getAllStudents } from '../controllers/student';

import { StudentUrl } from '../constants/links';

/**
 * @swagger
 * /students:
 *  get:
 *    tags:
 *       - Student API
 *    description: Use to fetch students
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: Students have been fetched successfully
 *      '500':
 *        description: Something went wrong
 */

router.get(
    StudentUrl.ALL,
    passport.authenticate('jwt', { session: false }),
    getAllStudents
);

export default router;
