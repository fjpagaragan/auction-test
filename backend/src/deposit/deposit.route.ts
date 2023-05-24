import express from "express";
import { CommonRoutesConfig } from "../common/config/common.routes.config";
import { auth } from "../common/utils/auth";
import DepositController from "./deposit.controller";
import { validate } from "../middleware/requestValidator";
import { createOrUpdateDepositValidator } from "./validators/create-or-update-deposit.validator";


export class DepositRoutes extends CommonRoutesConfig {
    constructor (router: express.Router) {
        super(router, "DepositRoutes");
    }

    configureRoutes() {
        this.router
            .route('/deposits')
            .get(auth, DepositController.getByUserId)
            .post(auth, validate(createOrUpdateDepositValidator()), DepositController.makeDeposit)
    }
}