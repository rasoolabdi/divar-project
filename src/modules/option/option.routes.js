const { Router } = require("express");
const optionController = require("./option.controller");


const router = Router();
router.post("/create" , optionController.create);
router.get("/list" , optionController.list);
router.get("/by-category/:categoryId" , optionController.findByCategoryId);
router.get("/:id" , optionController.findById);
router.get("/by-category-slug/:slug" , optionController.findByCategorySlug);
router.delete("/remove/:id" , optionController.removeById);

module.exports = {
    OptionRouter : router
}