const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const createHttpError = require("http-errors");
const { OptionMessage } = require("./option.message");
const { default: slugify } = require("slugify");
const CategoryModel = require("../category/category.model");


class OptionService {
    #model;
    #categoryModel;
    constructor() {
        autoBind(this);
        this.#model = OptionModel;
        this.#categoryModel = CategoryModel;
    }

    async create(optionDto) {
        const category = await this.checkExistById(optionDto.category);
        optionDto.category = category._id;
        console.log(optionDto.category);
        optionDto.key = slugify(optionDto.key , {trim: true , replacement: "_" , lower: true});
        await this.alreadyExistByCategoryAndKey(optionDto.key , category._id);
        if(optionDto?.enum && typeof optionDto.enum === "string") {
            optionDto.enum = optionDto.enum.split(",");
        }
        else if(!Array.isArray(optionDto.enum)) {
            optionDto.enum = [];
        }
        const option = await this.#model.create(optionDto);
        return option;
    }

    async list() {
        const option = await this.#model.find({} , {__v: 0} , {sort: {_id: -1}}).populate([{path: "category" , select: {name: 1 , slug: 1} }]);
        if(!option) throw new createHttpError.NotFound(OptionMessage.NotFound);
        return option;
    };

    async findById(id) {
        return await this.checkExistById(id);
    };

    async findByCategoryId(category){
        const option = this.#model.find({category} , {__v: 0} , {sort: {_id: -1}}).populate([{path: "category" , select: {name: 1 , slug: 1}}]);
        if(!option) throw new createHttpError.NotFound(OptionMessage.NotFound);
        return option;
    }

    async checkExistById(id) {
        const category = await this.#categoryModel.findById(id);
        if(!category) throw new createHttpError.NotFound(OptionMessage.NotFound);
        return category;
    }

    async alreadyExistByCategoryAndKey(key , category) {
        const isExists = await this.#model.findOne({category , key});
        if(isExists) throw createHttpError.Conflict(OptionMessage.AlraedyExist);
        return null;
    }

};

module.exports = new OptionService();