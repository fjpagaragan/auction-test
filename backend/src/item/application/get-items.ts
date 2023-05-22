import { ItemRepository } from "../domain/interfaces/repositories/item.repository";
import { Item } from "../domain/item";


export class GetItems {
    itemRepository: ItemRepository;

    constructor (
        itemRepository: ItemRepository
    ) {
        this.itemRepository = itemRepository;
    }

    async execute(status: string): Promise<Item[]> {
        const data = await this.itemRepository.getAll(status);

        return data;
    }
}