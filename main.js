const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
dotenv.config();


async function main() { 
    const app = express();
    const PORT = process.env.PORT;
    require("./src/config/mongoose.config");
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    SwaggerConfig(app);
    app.use(mainRouter);
    
    app.listen(PORT,() => {
        console.log(`Application is runing on port ${PORT}
            urlMainApp: http://localhost:${PORT}  
            swagger: http://localhost:${PORT}/swagger
        `)
    })
};
main();