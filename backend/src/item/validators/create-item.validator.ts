import { ValidationChain, body } from "express-validator";


export const createItemValidator = (): ValidationChain[] => {
    return [
        body("name")
            .notEmpty()
            .withMessage("Name is required")
            .bail(),
        body("start_price")
            .notEmpty()
            .withMessage("Start price is required!")
            .bail()
            .isFloat({ gt: 0 })
            .withMessage("Start price should be greater than 0")
            .bail(),
        body("duration")
            .notEmpty()
            .withMessage("Duration is required!")
            .bail()
            .isFloat({ gt: 0 })
            .withMessage("Duration should be greater than 0")
            .bail()
    ]
}