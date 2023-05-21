import { body, param, query, ValidationChain } from "express-validator";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import { ErrorMessage } from "./constants";


// Verify value is a valid RFC 4122 v4 UUID
export function validateUuidV4(uuid: string): boolean {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

export const VALIDATORS = {
  userIdParameter: param("userId")
    .notEmpty()
    .withMessage(ErrorMessage.USER_REQURED)
    .isUUID()
    .withMessage(ErrorMessage.INVALID_USER),
};
