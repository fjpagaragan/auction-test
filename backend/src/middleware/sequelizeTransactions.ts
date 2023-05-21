import { database, namespace } from "../common/config/database.config";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const sequelizeTransactions = async (req: Request, res: Response, next: NextFunction) => {
  namespace.bindEmitter(req);
  namespace.bindEmitter(res);
  namespace.bind(next);
  namespace.run(async () => {
    const transaction = await database.transaction();
    namespace.set('transaction', transaction);

    res.on('finish', function () {
      if (res.statusCode >= StatusCodes.BAD_REQUEST) {
        transaction.rollback();
      }
      else {
        transaction.commit();
      }

    });
    next();
  });
};
