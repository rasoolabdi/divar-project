const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const { CategoryMessage } = require("./category.message");
const {HttpCodes} = require("http-codes");

class CategoryController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = categoryService;

    };

    async create(req,res,next) {
        try {
            const name = req.body.name;
            const slug = req.body.slug;
            const icon = req.body.icon;
            const parent = req.body.parent;

            await this.#service.create({name , slug , icon , parent});
            return res.status(201).json({
                message: CategoryMessage.Created
            });
        }
        catch(error) {
            next(error);
        }
    };

    async list(req,res,next) {
        try {
            const category = await this.#service.list();
            return res.json(category);
        }
        catch(error) {
            next(error);
        }
    }
};

module.exports = new CategoryController();