import express from "express";
import { CommonRoutesConfig } from "../common/config/common.routes.config";
import { auth } from "../common/utils/auth";
import ItemController from "./item.controller";
import { 
    createItemValidator
} from "./validators/create-item.validator";
import { validate } from "../middleware/requestValidator";


export class ItemRoutes extends CommonRoutesConfig {
    constructor (router: express.Router) {
        super(router, "ItemRoutes");
    }

    configureRoutes() {
        this.router
            .route('/items')
            .post(auth, validate(createItemValidator()), ItemController.create);
    }
}