import { Bid } from "../../bid";


export interface BidRepository {
    create(bid: Bid): Promise<Bid>;
    getByItemId(id: string): Promise<Bid[]>;
}