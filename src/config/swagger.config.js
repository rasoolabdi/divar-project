const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
    const swaggerDocument = swaggerJsdoc({
        swaggerDefinition: {
            openapi: "3.0.1",
            info: {
                title: "divar",
                description: "project divar with nodejs",
                version: "1.1.0"
            }
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"]
    });
    const swagger = swaggerUi.setup(swaggerDocument , {});
    app.use("/swagger" , swaggerUi.serve , swagger);
}

module.exports = SwaggerConfig;
