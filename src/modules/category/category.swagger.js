/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Module and Route
 */

/**
 * @swagger
 *  components:
 *      schemas: 
 *          CreateCategory:
 *              type: object
 *              required: 
 *                  -   name
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent: 
 *                      type: string
 */

/**
 * @swagger
 * /category/create:
 *  post:
 *      summary: create new Category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategory"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategory"
 *      responses:
 *          201:
 *              description: create new category
 */

/**
 * @swagger
 * /category/list:
 *  get:
 *      summary: get all categories
 *      tags:
 *          -   Category
 *      responses:
 *          200:
 *              description: getAll Category successfully
 */