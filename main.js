const express = require("express");
const dotenv = require("dotenv");
dotenv.config();


async function main() { 
    const app = express();
    const PORT = process.env.PORT;
    require("./src/config/mongoose.config")

    app.listen(PORT,() => {
        console.log(`Application is runing on port ${PORT}
            url: http://localhost:${PORT}    
        `)
    })
};
main();