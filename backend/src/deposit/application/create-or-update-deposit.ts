import { Deposit } from "../domain/deposit";
import { DepositRepository } from "../domain/interfaces/repositories/deposit.repository";


export class CreateOrUpdateDeposit {
    depositRepository: DepositRepository;

    constructor (
        depositRepository: DepositRepository,
    ) {
        this.depositRepository = depositRepository;
    }

    async execute(user_id: string, amount: number): Promise<Deposit> {

        const deposit = await this.depositRepository.getByUser(user_id);

        if (deposit) {
            //Update existing Deposit
            const newAmount = Number(deposit.amount) + Number(amount);
            
            const result = await this.depositRepository.update(user_id, newAmount);
            console.log(result);
            
            return Deposit.Load(deposit.id, deposit.user_id, newAmount); 
        } else {
            // Create existing Depost
            const newDeposit = Deposit.Create(user_id, amount);
            console.log("test");
            return this.depositRepository.create(newDeposit);
        }
    }
}