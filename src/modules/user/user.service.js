const UserModel = require("./user.model");


class UserService {
    #model;
    constructor() {
        this.#model = UserModel;
    };
    

    
};

module.exports = new UserService();