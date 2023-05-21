import { ValidationChain, ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorMessage } from "../common/utils/constants";
import CustomError, { ErrorTypeKeys } from "../common/utils/custom-error";
import logger from "../common/utils/logger";


export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errorFormatter = ({ msg, param, value }: ValidationError) => {
          return { message: msg, parameter: param, value: value };
        };
        const errors = validationResult(req).formatWith(errorFormatter);
        if (errors.isEmpty()) {
          return next();
        }
        logger.info(errors.array());
        next(
          new CustomError(
            StatusCodes.BAD_REQUEST,
            ErrorMessage.VALIDATION_ERROR,
            ErrorTypeKeys.BAD_REQUEST,
            { errors: errors.array() }
          )
        );
      };
    
}