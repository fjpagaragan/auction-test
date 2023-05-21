import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import {
  instancePrefix,
  contentType,
  contentValue,
  ErrorTypes,
  ErrorMessage,
} from "../common/utils/constants"
import CustomError, { ErrorTypeKeys } from "../common/utils/custom-error"
import { xRequestID } from "./x-request-id"

/**
 * This middleware sends error response to the api consumer.The format of the error response follows the RFC-7807 standard. For More information:https://datatracker.ietf.org/doc/html/rfc7807.
 * Following are the fields which are sent as a part of response:
 * type - a URL to a document describing the error condition
 * title	- a short, human-readable title for the general error type
 * status - HTTP status code
 * detail - a human-readable description of the specific error
 * instance - URN with the id for the specific error. urn:dtn:maps:api:catalog:requestId:123e4567-e89b-12d3-a458-426614176000
 * additionalErrorInfo(optional) -> extra error information.
 * @param error - typeof CustomError
 * @param req - Express request
 * @param res - Express response
 * @param next - Express Next function
 */
const errorHandler = (
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const {
    status = StatusCodes.INTERNAL_SERVER_ERROR,
    detail = error.message ?? ErrorMessage.INTERNAL_SERVER_ERROR,
    errorTypeKey = ErrorTypeKeys.INTERNAL_SERVER_ERROR,
    additionalErrorInfo,
  } = error
  const requestID = `:requestId:${response.get(xRequestID)}`
  const route = request.originalUrl && request.originalUrl.split("?")[0]
  const instance = `${instancePrefix}${route}${requestID}`
  const { type, title } = ErrorTypes[errorTypeKey]

  const result: Record<string, unknown> = {
    type,
    title,
    status,
    detail,
    instance,
  }
  if (
    typeof additionalErrorInfo !== "undefined" &&
    Object.keys(additionalErrorInfo).length > 0
  ) {
    for (const [key, value] of Object.entries<unknown>(additionalErrorInfo)) {
      result[key] = value
    }
  }
  response.set(contentType, contentValue)
  response.status(status).send(result)
}
export default errorHandler
