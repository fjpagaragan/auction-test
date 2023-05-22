import { Request, Response } from "express";
import { ItemRepository } from "./domain/interfaces/repositories/item.repository";
import { TokenPayload, decodeToken } from "../common/utils/auth";
import { StatusCodes } from "http-status-codes";
import { ItemRepositoryDB } from "./data-access/repository/item.repository.db";
import { CreateItem } from "./application/create-item";
import { JwtPayload } from "jsonwebtoken";
import { GetOngoingItems } from "./application/get-ongoing-items";


class ItemController {
    itemRepository: ItemRepository;

    constructor (
        itemRepository: ItemRepository,
    ) {
        this.itemRepository = itemRepository;
    }

    public create = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const token: JwtPayload = await decodeToken(req.header('Authorization')!) as JwtPayload;
            
            const name = req.body.name;
            const start_price = req.body.start_price;
            const duration = req.body.duration;

            const item = await new CreateItem(this.itemRepository).execute({
                user_id: token.id,
                name,
                start_price,
                duration
            });
            res.status(StatusCodes.CREATED).json(item);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    public getOngoing = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const items = await new GetOngoingItems(this.itemRepository).execute();
            res.status(StatusCodes.OK).json(items);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);  
        }
    }
}

export default new ItemController(
    new ItemRepositoryDB()
);