const autoBind = require("auto-bind");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { PostMessage } = require("./post.message");



class PostController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = postService; 
    };
    
    async createPostPage(req,res,next) {
        try {   
            let slug = req.query.slug;
            let match = {parent: null}
            let showBack = false;
            let options;
            if(slug) {
                slug = slug.trim();
                const category = await CategoryModel.findOne({ slug });
                if(!category) throw new createHttpError.NotFound(PostMessage.NotFoundCategoryOfSlug);
                options = await this.#service.getCategoryOptions(category.id);
                showBack = true;
                match = {
                    parent: category._id
                }
            }
            const categories = await CategoryModel.aggregate([
                {
                    $match: match
                }
            ]);
            res.render("./pages/panel/create-post.ejs" , {
                categories,
                showBack,
                options
            });
        }
        catch(error) {
            next(error);
        }
    }



};

module.exports = new PostController();