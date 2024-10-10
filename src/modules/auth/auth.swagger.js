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
 */

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *       summary: login and register with OTP
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