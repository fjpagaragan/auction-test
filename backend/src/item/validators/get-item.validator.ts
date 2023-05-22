import { ValidationChain, param } from "express-validator";


export const getItemValidator = (): ValidationChain[] => {
    return [
        param("id")
            .isUUID()
            .withMessage("id should be uuid")
    ]
}