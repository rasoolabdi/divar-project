const { Router } = require("express");
const categoryController = require("./category.controller");

const router = Router()
router.post("/create" , categoryController.create)
router.get("/list" , categoryController.list);

module.exports = {
    CategoryRouter: router
}