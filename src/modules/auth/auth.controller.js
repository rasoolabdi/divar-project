const autoBind = require("auto-bind");
const authService = require("./auth.service");
const AuthMessage = require("./auth.messages");
const NodeEnv = require("../../common/constant/env.enum");
const CookieNames = require("../../common/constant/cookie.enum");


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
            const token = await this.#service.checkOTP(mobile , code);
            return res.cookie(CookieNames.AccessToken , token , {
                httpOnly: true,
                secure: process.env.NODE_ENV === NodeEnv.Production
            }).status(200).json({
                message: AuthMessage.LoginSuccessfully,
                accessToken: token
            })
        }
        catch(error) {
            next(error);
        }
    };

    async logout(req,res,next) {
        try {
            return res.clearCookie(CookieNames.AccessToken).status(200).json({
                message: AuthMessage.LoggedOut
            });
        }
        catch(error) {
            next(error);
        }
    }
};
module.exports = new AuthController();