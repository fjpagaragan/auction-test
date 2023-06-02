import { ItemRepository } from "../domain/interfaces/repositories/item.repository";


export class UpdateItemCurrentPrice {
    itemRepository: ItemRepository;

    constructor (
        itemRepository: ItemRepository,
    ) {
        this.itemRepository = itemRepository;
    }

    async execute(item_id: string, amount: number): Promise<boolean> {
        const data = await this.itemRepository.updateCurrentPrice(item_id, amount);

        return data;
    }
}