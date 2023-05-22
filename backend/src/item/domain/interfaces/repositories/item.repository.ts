import { Item } from "../../item";


export interface ItemRepository {
    create(item: Item): Promise<Item>;
    getById(id: string): Promise<Item | null>;
    getAll(status: string): Promise<Item[]>;
}