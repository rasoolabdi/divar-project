const autoBind = require("auto-bind");
const PostModel = require("./post.model");
const OptionModel = require("../option/option.model");


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


};
module.exports = new PostService();