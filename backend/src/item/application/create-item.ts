import { ItemAttributes } from "../domain/interfaces/item-attribute";
import { ItemRepository } from "../domain/interfaces/repositories/item.repository";
import { Item } from "../domain/item";


export class CreateItem {
    itemRepository: ItemRepository;

    constructor (
        itemRepository: ItemRepository
    ) {
        this.itemRepository = itemRepository;
    }

    async execute(item: ItemAttributes): Promise<Item> {
        const data = await this.itemRepository.create(Item.Create(item));

        return data;
    }
}