const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking Hotel API",
      version: "1.0.0",
      description: "API Doc for booking hotel !!!",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT" // Định dạng JWT Token
        },
      },
    },
    security: [{ BearerAuth: [] }] // Áp dụng security mặc định cho tất cả API
  },
  apis: [__dirname + "/../routes/**/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
