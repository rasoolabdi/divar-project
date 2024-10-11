const AuthorizationMessage = require("../messages/auth.message");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../../modules/user/user.model");
dotenv.config();


const Authorization = async (req,res,next) => {
    try {
        const token = req?.cookie?.access_token_divar;
        if(!token) {
            throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
        };

        const data = jwt.verify(token , process.env.JWT_SECRET_KEY);
        if(typeof data === "object" && data?.id) {
            const user = await UserModel.findById(data.id , {accessToken: 0 , otp: 0}).lean();
            if(!user) {
                throw new createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount);
            }
            req.user = user;
            return next();
        }
        throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
    }
    catch(error) {
        next(error)
    }
};

module.exports = Authorization;
