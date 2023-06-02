import { ValidationChain, body } from "express-validator";


export const createBidValidator = (): ValidationChain[] => {
    return [
        body("item_id")
            .notEmpty()
            .withMessage("Item ID is required")
            .bail(),
        body("amount")
            .notEmpty()
            .withMessage("Amount is required")
            .bail()
            .isFloat({ gt: 0})
            .withMessage("Amount should be greated than 0")
            .bail()
    ]
}