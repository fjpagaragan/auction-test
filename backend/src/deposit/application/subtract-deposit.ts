import { Deposit } from "../domain/deposit";
import { DepositRepository } from "../domain/interfaces/repositories/deposit.repository";


export class SubtractDeposit {
    depositRepository: DepositRepository;

    constructor (
        depositRepository: DepositRepository,
    ) {
        this.depositRepository = depositRepository;
    }

    async execute(user_id: string, amount: number): Promise<boolean> {
        const result = await this.depositRepository.update(user_id, amount);

        return result;
    }
}