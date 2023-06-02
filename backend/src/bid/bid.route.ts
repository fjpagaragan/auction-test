import express from "express"
import { CommonRoutesConfig } from "../../src/common/config/common.routes.config";
import { auth } from "../../src/common/utils/auth";
import { validate } from "../../src/middleware/requestValidator";
import { createBidValidator } from "./validators/create-bid.validator";
import BidController from "./bid.controller";


export class BidRoutes extends CommonRoutesConfig {
    constructor (router: express.Router) {
        super(router, "BidRoutes");
    }

    configureRoutes(): void {
        this.router
            .route('/bids')
            .post(auth, validate(createBidValidator()), BidController.createBid);
    }
}