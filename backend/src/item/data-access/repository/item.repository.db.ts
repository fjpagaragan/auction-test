import { ItemAttributes } from "../../../item/domain/interfaces/item-attribute";
import { Item } from "../../../item/domain/item";
import { ItemRepository } from "../../../item/domain/interfaces/repositories/item.repository";
import ItemModel from "../model/item.model";


export class ItemRepositoryDB implements ItemRepository {
    async create(item: Item): Promise<Item> {
        return await ItemModel.create(item);
    }
    async getById(id: string): Promise<Item | null> {
        return await ItemModel.findOne({
            where: { id }
        });
    }
    async get(): Promise<Item[]> {
        return await ItemModel.findAll();
        
    }

}