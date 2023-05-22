import { ValidationChain, body } from "express-validator";

export const authenticateUserValidator = (): ValidationChain[] => {
    return [
        body("email")
            .trim()
            .isEmail()
            .withMessage("Email is required.")
            .bail(),
        body("password")
            .isString()
            .withMessage("Password is required.")
            .bail(),
    ]
}