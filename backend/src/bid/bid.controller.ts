import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import _, { isEmpty } from "lodash";

import { BidRepository } from "./domain/interfaces/repositories/bid.repository";
import { DepositRepository } from "../../src/deposit/domain/interfaces/repositories/deposit.repository";
import { GetUserDeposit } from "../../src/deposit/application/get-user-deposit";
import { ItemRepository } from "../../src/item/domain/interfaces/repositories/item.repository";
import { GetItemById } from "../../src/item/application/get-item-by-id";
import { CreateBid } from "./application/create-bid";
import { AddDeposit } from "../deposit/application/add-deposit";

import { ItemRepositoryDB } from "../../src/item/data-access/repository/item.repository.db";
import { DepositRepositoryDB } from "../../src/deposit/data-access/repository/deposit.repository.db";
import { BidRepositoryDB } from "./data-access/repository/bid.repository.db";

import { decodeToken } from "../../src/common/utils/auth";
import CustomError, { ErrorTypeKeys } from "../../src/common/utils/custom-error";
import { UpdateItemCurrentPrice } from "../../src/item/application/update-item-current-price";


class BidController {
    itemRepository: ItemRepository;
    depositRepository: DepositRepository;
    bidRepository: BidRepository;

    constructor (
        itemRepository: ItemRepository,
        depositRepository: DepositRepository,
        bidRepository: BidRepository,
    ) {
        this.itemRepository = itemRepository;
        this.depositRepository = depositRepository;
        this.bidRepository = bidRepository;
    }

    public createBid = async (
        req: Request,
        res: Response,    
    ) => {
        try {
            const token: JwtPayload = await decodeToken(req.header('Authorization')!) as JwtPayload;
            const item_id = req.body.item_id;
            const amount = req.body.amount;

            const item = await new GetItemById(this.itemRepository).execute(item_id);
            if (isEmpty(item)) {
                throw new CustomError(StatusCodes.NOT_FOUND, "Item not found.", ErrorTypeKeys.NOT_FOUND);
            }

            const bid = await new CreateBid(this.bidRepository, this.depositRepository).execute({ user_id: token.id, item_id: item.id, amount, status: "Pending"}, item);
            await new UpdateItemCurrentPrice(this.itemRepository).execute(item.id, bid.amount);

            res.status(StatusCodes.CREATED).json(bid);
        } catch (error) {
            console.log(error);
            
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}

export default new BidController(
    new ItemRepositoryDB(),
    new DepositRepositoryDB(),
    new BidRepositoryDB()
)