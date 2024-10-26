const { Router } = require("express");
const {AuthRouter} = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { CategoryRouter } = require("./modules/category/category.routes");
const { OptionRouter } = require("./modules/option/option.routes");
const { PostRouter } = require("./modules/post/post.routes");
const postController = require("./modules/post/post.controller");

const mainRouter = Router();
mainRouter.use("/auth" , AuthRouter);
mainRouter.use("/user" , UserRouter);
mainRouter.use("/category" , CategoryRouter);
mainRouter.use("/option" , OptionRouter);
mainRouter.use("/post" , PostRouter);

mainRouter.get("/" , postController.findAllListOfPosts);

// mainRouter.get("/panel" , (req,res) => {
//     res.render("./pages/panel/dashboard.ejs")
// })

// mainRouter.get("/auth/login" , (req,res) => {
//     res.locals.layout = "./layouts/auth/main.ejs"
//     res.render("./pages/auth/login.ejs")
// })

module.exports = mainRouter;