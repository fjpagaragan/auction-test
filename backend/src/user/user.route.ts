import express from "express";
import { CommonRoutesConfig } from "../common/config/common.routes.config";
import UserController from "./user.controller";
import { validate } from "../middleware/requestValidator";
import { createUserValidator } from "./validators/create-user.validator";


export class UserRoutes extends CommonRoutesConfig {
    constructor(router: express.Router) {
        super(router, "UserRoutes");
    }

    configureRoutes() {
        this.router
            .route('/users')
            .post(validate(createUserValidator()), UserController.create);
    }
}