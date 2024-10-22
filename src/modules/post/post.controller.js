const autoBind = require("auto-bind");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { PostMessage } = require("./post.message");
const HttpCodes = require("http-codes");
const { Types } = require("mongoose");



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
            let category;
            if(slug) {
                slug = slug.trim();
                category = await CategoryModel.findOne({ slug });
                if(!category) throw new createHttpError.NotFound(PostMessage.NotFoundCategoryOfSlug);
                options = await this.#service.getCategoryOptions(category._id);
                if(options.length === 0) options = null;
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
                options,
                category: category?._id.toString(),
            });
        }
        catch(error) {
            next(error);
        }
    }

    async create(req,res,next) {
        try {
            console.log(req.body);
            const title = req.body.title_post;
            const content = req.body.description;
            const lat = req.body.lat;
            const lng = req.body.lng;
            const category = req.body.category;
            delete req.body["title_post"];
            delete req.body["description"];
            delete req.body["lat"];
            delete req.body["lng"];
            delete req.body["category"];
            const options = req.body;
            console.log("op" , options);
            await this.#service.create({
                title,
                content,
                coordinate: [lat , lng],
                category: new Types.ObjectId(category),
                images: [],
                options
            });

            return res.status(HttpCodes.OK).json({
                message: PostMessage.Created
            })
        }
        catch(error) {
            next(error);
        }
    }


};

module.exports = new PostController();