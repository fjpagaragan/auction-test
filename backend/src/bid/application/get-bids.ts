import { Bid } from "../domain/bid";
import { BidRepository } from "../domain/interfaces/repositories/bid.repository";


export class GetBids {
    bidRepository: BidRepository;

    constructor (
        bidRepository: BidRepository,
    ) {
        this.bidRepository = bidRepository;
    }

    async execute(item_id: string): Promise<Bid[]> {
        const bids = await this.bidRepository.getByItemId(item_id);

        return bids;
    }
}