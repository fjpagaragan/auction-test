import { ValidationChain, body, query } from "express-validator";


export const getItemsValidator = (): ValidationChain[] => {
    return [
        query("status")
            .notEmpty()
            .withMessage("status is required.")
            .bail()
            .isIn(['ongoing', 'completed'])
            .withMessage("status has invalid value")
    ];
}