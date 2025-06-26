const path = require("path");
const express = require("express");
const morgan = require("morgan");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger');


const configViewEngine = (app) => {
  // configure template engine
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");

  // config morgan
  app.use(morgan("dev"));
  // config static files
  app.use(express.static(path.join(__dirname, "../public")));

  // config swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = configViewEngine;
