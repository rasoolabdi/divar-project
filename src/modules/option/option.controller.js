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
            const {title , key , guid , enum: list , type , category,required} = req.body;
            await this.#service.create({title , key , guid , enum: list , type , category ,required});
            return res.status(HttpsCodes.CREATED).json({
                message: OptionMessage.Created
            })
        }
        catch(error) {
            next(error);
        }
    };

    async update(req,res,next) {
        try {
            const {id , title , key , guid , enum: list , category , required} = req.body;
            await this.#service.update({id , title , key , guid , enum: list , category , required});
            return res.status(HttpsCodes.OK).json({
                message: OptionMessage.Update
            });
        }
        catch(error) {
            next(error);
        }
    }

    async list(req,res,next) {
        try {
            const options = await this.#service.list();
            return res.status(HttpsCodes.OK).json(options)
        }
        catch(error) {
            next(error);
        }
    }

    async findById(req,res,next) {
        try {
            const {id} = req.params;
            const options = await this.#service.findById(id);
            return res.status(HttpsCodes.OK).json(options);
        }
        catch(error) {
            next(error);
        }
    }

    async findByCategoryId(req,res,next) {
        try {
            const {categoryId} = req.params;
            const option = await this.#service.findByCategoryId(categoryId);
            return res.status(HttpsCodes.OK).json(option);
        }
        catch(error) {
            next(error);
        }
    }

    async findByCategorySlug(req,res,next) {
        try {
            const slug = req.params.slug;
            const option = await this.#service.findByCategorySlug(slug);
            return res.status(HttpsCodes.OK).json(option);
        }
        catch(error) {
            next(error);
        }
    }

    async removeById(req,res,next) {
        try {
            const id = req.params.id;
            await this.#service.removeById(id);
            return res.status(HttpsCodes.OK).json({
                message: OptionMessage.Deleted
            });
        }
        catch(error) {
            next(error);
        }
    }
};
module.exports = new OptionController();