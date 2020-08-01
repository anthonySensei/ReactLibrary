import express from 'express';

import { getDepartments, addDepartment } from '../controllers/department';

const router = express.Router();

/**
 * @swagger
 * /departments:
 *  get:
 *    tags:
 *       - Department API
 *    description: Use to fetch departments
 *    produces:
 *       - application/json
 *    responses:
 *      '200':
 *        description: Departments have been fetched successfully
 *      '500':
 *        description: Something went wrong
 */

router.get('', getDepartments);

/**
 * @swagger
 * /departments:
 *  post:
 *    tags:
 *       - Department API
 *    description: Use to add department
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        type: string
 *        required: true
 *      - name: NewDepartmentData
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/NewDepartment'
 *    responses:
 *      '200':
 *        description: Department has been added successfully
 *      '500':
 *        description: Something went wrong
 */

router.post('', addDepartment);

export default router;
