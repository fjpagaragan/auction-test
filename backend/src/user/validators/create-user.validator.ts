import { ValidationChain, body } from "express-validator";

export const createUserValidator = (): ValidationChain[] => {
    return [
        body("email")
            .trim()
            .isEmail()
            .withMessage("Invalid email!")
            .bail(),
        body("password")
            .isString()
            .isLength({ min: 8 })
            .withMessage("Password should atleast be 8 characters long")
            .bail()
            .not()
            .isLowercase()
            .withMessage("Password should contain uppercase character")
            .bail()
            .not()
            .isUppercase()
            .withMessage("Password should contain lower character")
            .bail()
            .not()
            .isNumeric()
            .withMessage("Password should have numeric value")
            .bail()
            .not()
            .isAlpha()
            .withMessage("Password should be alpha numeric"),
    ]
}