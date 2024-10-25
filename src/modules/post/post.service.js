const autoBind = require("auto-bind");
const PostModel = require("./post.model");
const OptionModel = require("../option/option.model");
const createHttpError = require("http-errors");
const { PostMessage } = require("./post.message");
const { isValidObjectId } = require("mongoose");


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

    async list(userId) {
        if(userId && isValidObjectId(userId)) {
            return await this.#model.find({});
        }
        throw new createHttpError.BadRequest(PostMessage.RequestNotValid)
    };

    async checkExist(postId) {
        if(!postId || !isValidObjectId(postId)) {
            throw new createHttpError.BadRequest(PostMessage.RequestNotValid)
        };
        const post = await this.#model.findById(postId);
        if(!post) {
            throw new createHttpError.NotFound(PostMessage.NotFound);
        }
        return post;
    }

    async remove(postId) {
        await this.checkExist(postId);
        await this.#model.deleteOne({_id: postId});
    }

    async showPost() {
        
    }
};
module.exports = new PostService();