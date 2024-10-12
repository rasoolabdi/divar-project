const userService = require("./user.service");


class UserController {
    #service;
    constructor() {
        this.#service = userService;
    }

    async whoami(req,res,next) {
        try {
            const user = req.user;
            return res.status(200).json(user)
        }
        catch(error) {
            next(error);
        }
    }

};
module.exports = new UserController();