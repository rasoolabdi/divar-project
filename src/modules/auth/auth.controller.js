const autoBind = require("auto-bind");
const authService = require("./auth.service");
const AuthMessage = require("./auth.messages");


class AuthController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = authService;
    };

    async sendOTP(req,res,next) {
        try {
            const mobile = req.body.mobile;
            await this.#service.sendOTP(mobile);
            return {
                message: AuthMessage.SendOtpSuccessfully
            }
        }
        catch(error) {
            next(error);
        }
    };

    async checkOTP(req,res,next) {

    };

};
module.exports = new AuthController();