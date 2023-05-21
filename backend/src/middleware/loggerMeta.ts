import { Request, Response, NextFunction } from "express"
import  logger  from "../common/utils/logger"
import { xRequestID } from "./x-request-id"

function loggerMeta(req: Request, res: Response, next: NextFunction): void {
  logger.defaultMeta = {
    correlation_id: res.get(xRequestID),
    request: { url: req.originalUrl, query: req.query, body: req.body },
  }
  next()
}

export default loggerMeta
