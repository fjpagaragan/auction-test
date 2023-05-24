import { Guid } from "guid-typescript";
import { ItemAttributes } from "./interfaces/item-attribute";


export class Item implements ItemAttributes {
    public id!: string;
    public user_id!: string;
    public name!: string;
    public start_price!: number;
    public current_price!: number;
    public duration!: number;

    private constructor(item: ItemAttributes, id?: string, ) {
        if (!id) {
            this.id = Guid.create().toString();
        } else {
            this.id = id;
        }

        this.user_id = item.user_id;
        this.name = item.name;
        this.start_price = item.start_price;
        this.current_price = item.current_price;
        this.duration = item.duration;
    }

    public static Load(id: string, item: ItemAttributes) {
        return new Item(item, id);
    }

    public static Create(item: ItemAttributes) {
        return new Item(item);
    }
}