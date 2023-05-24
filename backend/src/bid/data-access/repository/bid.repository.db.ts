import { Bid } from "../../../bid/domain/bid";
import { BidRepository } from "../../../bid/domain/interfaces/repositories/bid.repository";
import BidModel from "../model/bid.model";


export class BidRepositoryDB implements BidRepository {
    async create(bid: Bid): Promise<Bid> {
        return await BidModel.create(bid);
    }

    async getByItemId(id: string): Promise<Bid[]> {
        return await BidModel.findAll({
            where: {
                item_id: id
            }
        });
    }

}