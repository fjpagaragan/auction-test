import { ItemAttributes } from "../../../item/domain/interfaces/item-attribute";
import { Item } from "../../../item/domain/item";
import { ItemRepository } from "../../../item/domain/interfaces/repositories/item.repository";
import ItemModel from "../model/item.model";
import { Sequelize } from "sequelize";


export class ItemRepositoryDB implements ItemRepository {

    async create(item: Item): Promise<Item> {
        return await ItemModel.create(item);
    }

    async getById(id: string): Promise<Item | null> {
        return await ItemModel.findOne({
            where: { id }
        });
    }

    async getAll(status: string): Promise<Item[]> {
        console.log(status);
        
        const symbol = status === 'ongoing' ? '<' : '>=';

        return await ItemModel.findAll({
            where: Sequelize.literal(`(DATE_PART('day', NOW() - "createdAt") * 24 + 
            DATE_PART('hour', NOW() - "createdAt")) ${symbol} duration`)
        })
    }

    async updateCurrentPrice(id: string, price: number): Promise<boolean> {
        const [count] = await ItemModel.update({ current_price: price }, {
            where: {
                id
            }
        });

        return count > 0;
    }

}