const autoBind = require("auto-bind");
const optionService = require("./option.service");
const HttpsCodes = require("http-codes");
const { OptionMessage } = require("./option.message");


class OptionController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = optionService;
    };

    async create(req,res,next) {
        try {
            const {title , key , guid , enum: list , type , category} = req.body;
            await this.#service.create({title , key , guid , enum: list , type , category});
            return res.status(HttpsCodes.CREATED).json({
                message: OptionMessage.Created
            })
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