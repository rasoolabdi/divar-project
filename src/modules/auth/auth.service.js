const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const AuthMessage = require("./auth.messages");
const createHttpError = require("http-errors");
const {randomInt} = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


class AuthService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = UserModel;    
    }

    async sendOTP(mobile) {
        const user = await this.#model.findOne({ mobile });
        const now = new Date().getTime();
        const otp = {
            code: randomInt(100000 , 999999),
            expiresIn: now + (1000 * 60 * 2)
        };

        if(!user) {
            const newUser = await this.#model.create({ mobile , otp });
            return newUser;
        };
    
        if(user.otp && user.otp.expiresIn > now) {
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired)
        }
        
        user.otp = otp;
        await user.save();
        return user;  
    }

    async checkOTP(mobile , code) {
        const user = await this.checkExistByMobile(mobile);
        const now = new Date().getTime();
        if(user?.otp?.expiresIn < now) {
            throw new createHttpError.Unauthorized(AuthMessage.OtpCodeExpired);
        };
        if(user?.otp?.code !== code) {
            throw new createHttpError.Unauthorized(AuthMessage.OtpCodeInCorrect)
        };
        if(!user.verifiedMobile) {
            user.verifiedMobile = true;
        }
        
        const accessToken = this.signToken({mobile , id: user._id});
        user.accessToken = accessToken;
        await user.save();
        return accessToken;
    };

    async checkExistByMobile(mobile) {
        const user = await this.#model.findOne({mobile});
        if(!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
        return user;
    }

    signToken(payload) {
        return jwt.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn : "1y"})
    }
};

module.exports = new AuthService();