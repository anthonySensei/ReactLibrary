/**
 * @swagger
 * definitions:
 *   MoveBook:
 *     type: object
 *     required:
 *       - quantity
 *       - book
 *       - departmentId
 *     properties:
 *       quantity:
 *          type: number
 *       book:
 *         type: Book
 *       departmentId:
 *         type: string
 *   NewBook:
 *     type: object
 *     required:
 *       - isbn
 *       - image
 *       - language
 *       - title
 *       - description
 *       - year
 *       - quantity
 *       - genres
 *       - author
 *       - department
 *     properties:
 *       quantity:
 *          type: number
 *       title:
 *         type: string
 *       department:
 *         type: string
 *       author:
 *          type: string
 *       genres:
 *         type: Genre[]
 *       isbn:
 *         type: string
 *       year:
 *          type: number
 *       description:
 *         type: string
 *       language:
 *         type: string
 *       image:
 *         type: string
 *   CheckBookUniqueness:
 *     type: object
 *     properties:
 *       isbn:
 *          type: string
 *       department:
 *         type: string
 */
