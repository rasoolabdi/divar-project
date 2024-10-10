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
            if(!mobile.startsWith("09")) {
                return res.json({
                    message: AuthMessage.StartWithsMobile
                })
            }

            await this.#service.sendOTP(mobile);
            return res.json({
                message: AuthMessage.SendOtpSuccessfully
            })
        }
        catch(error) {
            next(error);
        }
    };

    async checkOTP(req,res,next) {
        try {
            const mobile = req.body.mobile;
            const code = req.body.code;
            await this.#service.checkOTP(mobile , code);
            return res.json({
                message: AuthMessage.LoginSuccessfully
            })
        }
        catch(error) {
            next(error);
        }
    };

};
module.exports = new AuthController();