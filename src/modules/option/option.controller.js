const autoBind = require("auto-bind");
const optionService = require("./option.service");


class OptionController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = optionService;
    };

    async create(req,res,next) {
        try {
            
        }
        catch(error) {
            next(error);
        }
    };

    async list(req,res,next) {
        try {

        }
        catch(error) {
            next(error);
        }
    }

    async findById(req,res,next) {
        try {

        }
        catch(error) {
            next(error);
        }
    }

    async findByCategoryId(req,res,next) {
        try {

        }
        catch(error) {
            next(error);
        }
    }
};
module.exports = new OptionController();