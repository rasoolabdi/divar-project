/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Module and Routes 
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required: 
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile: 
 *                      type: string
 *                  code:
 *                      type: string
 */

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *       summary: send otp and register user with enter phone number
 *       tags:
 *           -   Auth
 *       requestBody:
 *           content:
 *               application/x-www-form-urlencoded:
 *                   schema:
 *                       $ref: "#/components/schemas/SendOTP"
 *               application.json:
 *                   schema:
 *                       $ref: "#/components/schemas/SendOTP"
 *       responses: 
 *           200:
 *               description: "send otp successfully"
 */


/**
 * @swagger
 * /auth/check-otp:
 *  post:
 *       summary: check otp for login user
 *       tags:
 *           -  Auth
 *       requestBody:
 *           content:
 *               application/x-www-form-urlencoded:
 *                   schema:
 *                       $ref: "#/components/schemas/CheckOTP"   
 *               application/json:
 *                   schema:
 *                       $ref: "#/components/schemas/CheckOTP"
 *       responses:
 *           200:
 *               description: "login successfully"
 */