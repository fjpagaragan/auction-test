class CustomError extends Error {
    constructor(
      public status: number,
      public detail: string,
      public errorTypeKey: ErrorTypeKeys,
      public additionalErrorInfo?: Record<string, unknown>
    ) {
      super(detail)
    }
  }
  export interface ErrorType {
    type: string
    title: string
  }
  export enum ErrorTypeKeys {
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED,
    BAD_REQUEST,
    SERVICE_UNAVAILABLE,
    FORBIDDEN,
    NOT_FOUND,
  }
  
  export default CustomError
  