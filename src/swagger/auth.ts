/**
 * @swagger
 * definitions:
 *   Registration:
 *     type: object
 *     required:
 *       - studentId
 *       - email
 *       - password
 *       - name
 *     properties:
 *       studentId:
 *          type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       name:
 *         type: string
 *   Login:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *   AccountActivation:
 *     type: object
 *     required:
 *       - activationToken
 *     properties:
 *       activationToken:
 *         type: string
 *   CheckUniqueness:
 *     type: object
 *     properties:
 *       studentId:
 *          type: string
 *       email:
 *         type: string
 *         format: email
 */
