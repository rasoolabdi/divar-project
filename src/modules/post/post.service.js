const autoBind = require("auto-bind");
const PostModel = require("./post.model");
const OptionModel = require("../option/option.model");
const createHttpError = require("http-errors");
const { PostMessage } = require("./post.message");


class PostService {

    #model;
    #OptionModel;
    constructor() {
        autoBind(this);
        this.#model = PostModel;
        this.#OptionModel = OptionModel;
    }

    async getCategoryOptions (categoryId) {
        const options = await this.#OptionModel.find({category: categoryId});
        return options;
    }

    async create(Dto) {
        const postSave = await this.#model.create(Dto);
        if(!postSave) {
            throw new createHttpError.BadRequest(PostMessage.NotSaved)
        }
        return true;
    };

    async list(query={}) {
        return await this.#model.find({});
    };

};
module.exports = new PostService();