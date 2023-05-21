import http from 'http';
import logger from "./common/utils/logger";
import { sigterm } from "./common/utils/signals";

import version from './index';

type Server = http.Server;

process.on('SIGTERM', () => sigterm());

logger.info('------------------------------------------------');
logger.info(`version  : ${version}`);
logger.info(`appEnv   : ${process.env.NODE_ENV ?? ''}`);
logger.info(`logLevel : ${process.env.LOG_LEVEL ?? '-'}`);
logger.info(`pod      : ${process.env.POD_IP ?? '-'}`);
logger.info(`pid      : ${process.pid}`);
logger.info(`user   : ${process.env.DB_USERNAME ?? ''}`);
logger.info(`database   : ${process.env.DB_DATABASE ?? ''}`);

///------------------
// REST Server
import app from "./index";

const restPort = 3030;
export const server: Server = http.createServer(app).listen(restPort, () => {
  logger.info(`rest    : http://localhost:${restPort}`);

});
