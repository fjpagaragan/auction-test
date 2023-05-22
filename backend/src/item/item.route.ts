import express from "express";
import { CommonRoutesConfig } from "../common/config/common.routes.config";
import { auth } from "../common/utils/auth";
import ItemController from "./item.controller";
import { 
    createItemValidator
} from "./validators/create-item.validator";
import { validate } from "../middleware/requestValidator";
import { getItemsValidator } from "./validators/get-items.validator";
import { getItemValidator } from "./validators/get-item.validator";


export class ItemRoutes extends CommonRoutesConfig {
    constructor (router: express.Router) {
        super(router, "ItemRoutes");
    }

    configureRoutes() {
        this.router
            .route('/items/:id')
            .get(auth, validate(getItemValidator()), ItemController.getById)

        this.router
            .route('/items')
            .get(auth, validate(getItemsValidator()), ItemController.getAll)
            .post(auth, validate(createItemValidator()), ItemController.create);
    }
}