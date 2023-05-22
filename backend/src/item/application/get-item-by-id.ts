import { ItemRepository } from "../domain/interfaces/repositories/item.repository";
import { Item } from "../domain/item";


export class GetItemById {
    itemRepository: ItemRepository;

    constructor (
        itemRepository: ItemRepository,
    ) {
        this.itemRepository = itemRepository;
    }

    async execute(id: string): Promise<Item | null> {
        const item = await this.itemRepository.getById(id);

        return item;
    }
}