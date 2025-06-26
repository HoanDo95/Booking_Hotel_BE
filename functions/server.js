const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const { cookieParser, handleCSRFError } = require("../src/middleware/CSRFMiddleware");
const logRequest = require("../src/middleware/LogRequestMiddleware");
const passport = require("passport");
const app = express();
const { standardLimiter } = require("../src/middleware/RateLimitMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(handleCSRFError);
app.use(standardLimiter);
require("../src/configs/Auth");

const { connect } = require('../src/database/db');
connect();

const configViewEngine = require('../src/configs/ViewEngine');
configViewEngine(app);

const security = require('../src/configs/Security');

(async () => {
  await security(app);

  const setupSwagger = require('../src/swagger/swagger');
  setupSwagger(app);

  const mainRouter = require('../src/routes/MainRouter');
  app.use(mainRouter);

  // -----------------
  // Start Server
  // -----------------
  const { startServer } = require('../src/configs/PortCustom');
  startServer(app);
})();
