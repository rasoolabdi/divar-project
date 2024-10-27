const autoBind = require("auto-bind");
const PostModel = require("./post.model");
const OptionModel = require("../option/option.model");
const createHttpError = require("http-errors");
const { PostMessage } = require("./post.message");
const { isValidObjectId, Types } = require("mongoose");
const CategoryModel = require("../category/category.model");


class PostService {

    #model;
    #OptionModel;
    #CategoryModel;
    constructor() {
        autoBind(this);
        this.#model = PostModel;
        this.#OptionModel = OptionModel;
        this.#CategoryModel = CategoryModel;
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
        const [post] = await this.#model.aggregate([
            {
                $match: { _id: new Types.ObjectId(postId)}
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    userMobile: "$user.mobile"
                }
            },
            {
                $project: {
                    user: 0,
                    __v: 0
                }
            }
            
        ])
        console.log("log" , post);
        if(!post) {
            throw new createHttpError.NotFound(PostMessage.NotFound);
        }
        return post;
    }

    async remove(postId) {
        await this.checkExist(postId);
        await this.#model.deleteOne({_id: postId});
    }

    async findAllListOfPosts(options) {
        let { category , search } = options;
        const query = {};
        if(category) {
            const result = await this.#CategoryModel.findOne({slug: category});
            let categories = await this.#CategoryModel.find({parents: result._id} , {_id:1});
            categories = categories.map((item) => item._id);
            if(result) {
                query["category"] = {
                    $in: [result._id , ... categories]
                }
            }
            else {
                return [];
            }
        }
        
        if(search) {
            search = new RegExp(search , "ig");
            query['$or'] = [
                {title: search},
                {description: search}
            ]
        }

        const posts = await this.#model.find(query , {} , {sort: {_id: -1}})
        return posts;
    }
};
module.exports = new PostService();