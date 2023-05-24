import { Guid } from "guid-typescript";
import { BidAttributes } from "./interfaces/bid-attribute";


export class Bid implements BidAttributes {
    public id!: string;
    public user_id!: string;
    public item_id!: string;
    public amount!: number;
    public status!: string;


    private constructor(bid: BidAttributes, id?: string) {

        this.id = !id ? this.id = Guid.create().toString() : id;
        this.user_id = bid.user_id;
        this.item_id = bid.item_id;
        this.amount = bid.amount;
        this.status = bid.status;
    }

    public static Create(bid: BidAttributes) {
        return new Bid(bid);
    }

    public static Load(id: string, bid: BidAttributes) {
        return new Bid(bid, id);
    }
}