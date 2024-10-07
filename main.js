const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swagger.config");
dotenv.config();


async function main() { 
    const app = express();
    const PORT = process.env.PORT;
    require("./src/config/mongoose.config");
    SwaggerConfig(app);
    
    app.listen(PORT,() => {
        console.log(`Application is runing on port ${PORT}
            urlMainApp: http://localhost:${PORT}  
            swagger: http://localhost:${PORT}/swagger
        `)
    })
};
main();