const autoBind = require("auto-bind");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { PostMessage } = require("./post.message");
const HttpCodes = require("http-codes");
const { Types } = require("mongoose");
const { default: axios } = require("axios");
const { getAddressUserDetail } = require("../../common/utils/http");
const { removePropertyInObject } = require("../../common/utils/functions");
const utf8 = require("utf8");




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
            console.log(req.files);
            const images = req?.files.map((image) => image?.path?.slice(7));
            const title = req.body.title_post;
            const content = req.body.description;
            const lat = req.body.lat;
            const lng = req.body.lng;
            const category = req.body.category;
            const {address , province , city , district , alley} = await getAddressUserDetail(lat,lng);
            const options = removePropertyInObject(req.body , ['title_post' , 'description' , 'lat' , 'lng' , 'category' , 'images' ]);
            console.log("op" , options);
            for(let key in options) {
                let value = options[key];
                delete options[key];
                key = utf8.decode(key);
                options[key] = value;
            }
            await this.#service.create({
                title,
                content,
                category: new Types.ObjectId(category),
                images,
                options,
                address,
                province,
                city,
                district,
                alley,
                coordinate: [lat , lng]
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