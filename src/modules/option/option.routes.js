const { Router } = require("express");
const optionController = require("./option.controller");


const router = Router();
router.post("/create" , optionController.create);
router.get("/list" , optionController.list);
router.get("/category/:categoryId" , optionController.findByCategoryId);
router.get("/:id" , optionController.findById);
router.get("/by-category-slug/:slug" , optionController.findByCategorySlug);

module.exports = {
    OptionRouter : router
}