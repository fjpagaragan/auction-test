import { Deposit } from "../../../deposit/domain/deposit";
import { DepositRepository } from "../../../deposit/domain/interfaces/repositories/deposit.repository";
import DepositModel from "../model/deposit.model";


export class DepositRepositoryDB implements DepositRepository {

    async create(deposit: Deposit): Promise<Deposit> {
        return await DepositModel.create(deposit);
    }

    async update(user_id: string, amount: number): Promise<boolean> {
        const [result] = await DepositModel.update({
            amount
        },{
            where: { user_id }
        });
        console.log(result, amount);
        
        return result > 0;
    }

    async getByUser(user_id: string): Promise<Deposit | null> {
        return await DepositModel.findOne({
            where: {
                user_id
            }
        })
    }

}