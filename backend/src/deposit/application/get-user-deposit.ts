import { Deposit } from "../domain/deposit";
import { DepositRepository } from "../domain/interfaces/repositories/deposit.repository";


export class GetUserDeposit {
    depositRepository: DepositRepository;

    constructor (
        depositRepository: DepositRepository,
    ) {
        this.depositRepository = depositRepository;
    }

    async execute(user_id: string): Promise<Deposit | null> {
        const deposit = await this.depositRepository.getByUser(user_id);
        
        return deposit;
    }
}