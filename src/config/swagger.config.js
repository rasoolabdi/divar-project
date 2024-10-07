const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
    const swaggerDocument = swaggerJsdoc({
        swaggerDefinition: {
            info: {
                title: "divar",
                description: "project divar with nodejs",
                version: "1.1.0"
            }
        },
        apis: []
    });
    const swagger = swaggerUi.setup(swaggerDocument , {});
    app.use("/swagger" , swaggerUi.serve , swagger);
}

module.exports = SwaggerConfig;
