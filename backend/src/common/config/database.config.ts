import { createNamespace } from "cls-hooked";
import { Sequelize } from "sequelize"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbconfig = require("../../../config/config.js");


export const namespace = createNamespace(dbconfig.clsNamespace);
Sequelize.useCLS(namespace);

export const database = new Sequelize({
  database: dbconfig.database,
  dialect: dbconfig.dialect,
  username: dbconfig.username,
  password: dbconfig.password,
  host: dbconfig.host,
  port: dbconfig.port,
  logging: dbconfig.logging,
})
