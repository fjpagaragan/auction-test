import { ItemRepository } from "../domain/interfaces/repositories/item.repository";
import { Item } from "../domain/item";


export class GetOngoingItems {
    itemRepository: ItemRepository;

    constructor (
        itemRepository: ItemRepository
    ) {
        this.itemRepository = itemRepository;
    }

    async execute(): Promise<Item[]> {
        const data = await this.itemRepository.getAllOnGoing();

        return data;
    }
}