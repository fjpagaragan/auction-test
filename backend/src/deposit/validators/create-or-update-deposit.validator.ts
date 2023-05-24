import { ValidationChain, body } from "express-validator";


export const createOrUpdateDepositValidator = (): ValidationChain[] => {
    return [
        body("amount")
            .notEmpty()
            .withMessage("Amount is required")
            .bail()
            .isFloat({ gt: 0 })
            .withMessage("Amount should be greater than 0")
            .bail()
    ];
}