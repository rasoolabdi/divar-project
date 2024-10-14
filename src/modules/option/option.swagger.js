/**
 * @swagger
 * tags: 
 *  name: Option Module and Route
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   type
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:
 *                      type: string
 *                  guid: 
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   boolean
 *                          -   string
 *                          -   array
 *                  enum:
 *                      type: array
 *                      items: 
 *                          type: string
 */

/**
 * @swagger
 * /option/create:
 *  post:
 *      summary: create new option for post
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/CreateOption"
 *              application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CreateOption"
 *      responses:
 *          201:
 *              description: createOption successfully
 */

/**
 * @swagger
 * /option/{categoryId}:
 *  get:
 *      summary: get All list options of category
 *      tags:
 *          -   Option
 *      parameters:
 *          -   name: categoryId
 *              in: path
 *              type: string
 *      responses:
 *          200:
 *              description: getAllOption Successfully
 */