import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { CommonRoutesConfig } from "./common/config/common.routes.config";
import logger from "./common/utils/logger";
import { shouldCompress } from "./common/utils/utility";
import errorHandler from "./middleware/errorHandler";
import loggerMeta from "./middleware/loggerMeta";
import responseLogger from "./middleware/responseLogger";
import validateHeaders from "./middleware/validate-headers";
import xRequestIdInjector from "./middleware/x-request-id";
import { sequelizeTransactions } from "./middleware/sequelizeTransactions";
import { UserRoutes } from "./user/user.route";
import { ItemRoutes } from "./item/item.route";
import { DepositRoutes } from "./deposit/deposit.route";

// const swaggerDoc = swaggerJSDoc(swaggerOptions);

// Instantiate application
const app = express();


//Compression Middleware
app.use(compression({ filter: shouldCompress }));
app.use(morgan("combined"));

app.use(validateHeaders);

// Set middleware
// Inject X-Request-ID header if not provided or invalid
app.use(xRequestIdInjector);
app.use(loggerMeta);

// A bunch of sane defaults
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sequelize transactions
app.use(sequelizeTransactions);

const versionPrefix = "/v1";
// Attach routes
const routes: Array<CommonRoutesConfig> = [];
const v1Router = express.Router();
app.use(versionPrefix + "/", v1Router);
logger.info(`Test - ${versionPrefix}`);

routes.push(new UserRoutes(v1Router));
routes.push(new ItemRoutes(v1Router));
routes.push(new DepositRoutes(v1Router));

v1Router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    logger.info(`Routes configured for ${r.route.path}`);
  }
});
app.use(responseLogger);
//ErrorHandler Middleware
app.use(errorHandler);

// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default app;
