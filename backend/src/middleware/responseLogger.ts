import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import logger, { LOG_LEVEL } from "../common/utils/logger"

const responseLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    const endPoint = `${res.locals.route}:${req.query.interval}`
    logger.log(
      res.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR
        ? LOG_LEVEL.ERROR
        : LOG_LEVEL.INFO,
      `${endPoint} Status`,
      {
        response: {
          status_code: res.statusCode,
          message: res.statusMessage,
        },
        endpoint: endPoint,
      }
    )
  })
  next()
}

export default responseLogger
