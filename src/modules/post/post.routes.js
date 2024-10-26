const { Router } = require("express");
const postController = require("./post.controller");
const { upload } = require("../../common/utils/multer");
const Authorization = require("../../common/guard/authorization.guard");
const router = Router();

router.get("/create" , Authorization , postController.createPostPage);
router.post("/create" , Authorization , upload.array("images" , 10) , postController.create);
router.get("/list", Authorization , postController.postsList);
router.delete("/delete/:id" , Authorization ,postController.remove);
router.get("/show-post/:id" , postController.showPost);
module.exports = {
    PostRouter: router
}