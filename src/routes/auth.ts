import express from 'express';

import {
    postCreateUser,
    postCheckActivationToken,
    postLoginUser,
    getLogout,
    checkStudentRegistration
} from '../controllers/auth';

import { AuthUrls } from '../constants/links';

const router = express.Router();

/**
 * @swagger
 * /registration:
 *  post:
 *    tags:
 *       - Auth API
 *    description: Use to create user with role STUDENT
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: registrationData
 *        description: Object of registration data
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/Registration'
 *    responses:
 *      '200':
 *        description: Account has been successfully created
 *      '500':
 *        description: Something went wrong
 */

router.post(AuthUrls.REGISTRATION, postCreateUser);

/**
 * @swagger
 * /check-activation-token:
 *  post:
 *    tags:
 *       - Auth API
 *    description: Use to activate user
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: registrationData
 *        description: Object of activation account data
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/AccountActivation'
 *    responses:
 *      '200':
 *        description: Account has been successfully activated
 *      '500':
 *        description: Something went wrong
 */

router.post(AuthUrls.CHECK_ACTIVATION_TOKEN, postCheckActivationToken);

/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *       - Auth API
 *    description: Use to login user
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: loginData
 *        description: Object of login data
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/Login'
 *    responses:
 *      '200':
 *        description: Account has been successfully logged in
 *      '500':
 *        description: Something went wrong
 */

router.post(AuthUrls.LOGIN, postLoginUser);

/**
 * @swagger
 * /logout:
 *  get:
 *    tags:
 *       - Auth API
 *    description: Use to logout user
 *    produces:
 *       - application/json
 *    responses:
 *      '200':
 *        description: Account has been successfully logged out
 */

router.get(AuthUrls.LOGOUT, getLogout);

/**
 * @swagger
 * /registration/check:
 *  post:
 *    tags:
 *       - Auth API
 *    description: Use to check uniqueness of fields during registration
 *    produces:
 *       - application/json
 *    parameters:
 *      - name: checkUniquenessData
 *        description: Object of fields which must be unique
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/CheckUniqueness'
 *    responses:
 *      '200':
 *        description: Fields are checked
 *      '500':
 *        description: Something went wrong
 */

router.post(AuthUrls.CHECK_UNIQUENESS, checkStudentRegistration);

export default router;
