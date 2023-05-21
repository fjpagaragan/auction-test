import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { acceptEncoding, compressionFormat, ErrorMessage } from "./constants"
import CustomError, { ErrorTypeKeys } from "./custom-error"


export const shouldCompress = (req: Request, res: Response) => {
  const compressionHeader = req.headers[acceptEncoding]
  if (compressionHeader) {
    const regExp = new RegExp(`\\b${compressionFormat}\\b`, "gi")
    if (compressionHeader.toString().match(regExp) !== null) {
      return true
    }
    throw new CustomError(
      StatusCodes.NOT_ACCEPTABLE,
      ErrorMessage.UNSUPPORTED_ACCEPT_ENCODING,
      ErrorTypeKeys.FORBIDDEN
    )
  }
  return false
}
