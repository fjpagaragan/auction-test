import { ErrorTypeKeys, ErrorType } from "./custom-error";

export enum ErrorMessage {
  INTERNAL_SERVER_ERROR = "Something went wrong with this request. Please contact the administrator",
  MISSING_ITEM = " Item Not Found ",
  MISSING_VALUE = "Parameter Value is either missing or empty",
  MISSING_ID = "Parameter ID is either missing or empty",
  INVALID_UUID = "Please pass valid UUID",
  INVALID_LENGTH = "ID should be 36 characters long",
  INVALID_TYPE = "Value should be of type string",
  VALIDATION_ERROR = "Validation failed.",
  UNSUPPORTED_ACCEPT_ENCODING = "You have provided an unsupported Accept-Encoding. We support only the following: gzip",
  INVALID_OPERATION = "User does not have the correct permissions to execute this operation",

  /**
   * Auth Errors
   */
  UNAUTHORIZED = "Unauthorized",
  AUTH_TOKEN_REQUIRED = "Token is required",
  AUTH_TOKEN_INVALID = "Token is invalid",
  AUTH_TOKEN_EXPIRED = "Token is expired",

  /**
   * User Errors
   */
  USER_REQURED = "User is required",
  INVALID_USER = "User is invalid",

}

export const contentType = "Content-Type";
export const contentValue = "application/problem+json";
export const instancePrefix = "urn:dtn:grain-market-backend:";
export const acceptEncoding = "accept-encoding";
export const compressionFormat = "gzip";

export const ErrorTypes: Record<ErrorTypeKeys, ErrorType> = {
  [ErrorTypeKeys.INTERNAL_SERVER_ERROR]: {
    type: "internal-server-error",
    title: "Internal Server Error",
  },
  [ErrorTypeKeys.UNAUTHORIZED]: {
    type: "unauthorized",
    title: "Error while authenticating the user",
  },
  [ErrorTypeKeys.BAD_REQUEST]: {
    type: "bad-request",
    title: "Invalid Request",
  },
  [ErrorTypeKeys.FORBIDDEN]: {
    type: "forbidden",
    title: "Access to the Requested Resource is Forbidden",
  },
  [ErrorTypeKeys.SERVICE_UNAVAILABLE]: {
    type: "service-unavailable",
    title: "Backend or Database Unavailable",
  },
  [ErrorTypeKeys.NOT_FOUND]: {
    type: "not-found",
    title: "Not Found",
  },
};

