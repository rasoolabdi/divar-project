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
 *                  required:
 *                      type: boolean
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
 * @swaager
 *  components:
 *      schemas:
 *          UpdateOption:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:       
 *                      type: string
 *                  guid:
 *                      type: string
 *                  required:
 *                      type: boolean
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
 * /option/update/{id}:
 *  put:
 *      summary: update option for post
 *      tags:
 *          -   Option
 *      parameters:
 *          -   name: id
 *              in: path
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateOption"
 *              application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateOption"
 *      responses:
 *          200:
 *              description: updateOption successfully
 */

/**
 * @swagger
 * /option/list:
 *  get:
 *      summary: get All list options
 *      tags:
 *          -   Option
 *      responses: 
 *          200:
 *              description: getAllOptions Successfully
 */

/**
 * @swagger
 * /option/by-category/{categoryId}:
 *  get:
 *      summary: get list options of category
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

/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary: get option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   name: id
 *              in: path
 *              type: string
 *      responses:
 *          200:
 *              description: getOption Successfully
 */

/**
 * @swagger
 * /option/by-category-slug/{slug}:
 *  get:
 *      summary: get category by slug
 *      tags:
 *          -   Option
 *      parameters:
 *          -   name: slug
 *              in: path
 *              type: string
 *      responses: 
 *          200:
 *              description: get categoryWithSlug Successfully
 */

/**
 * @swagger
 * /option/remove/{id}:
 *  delete: 
 *      summary: delete option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   name: id
 *              in: path
 *              type: string
 *      responses: 
 *          200:
 *              description: deleted option successfully
 */
