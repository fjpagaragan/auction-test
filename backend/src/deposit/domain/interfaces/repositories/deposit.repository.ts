import { Deposit } from "../../deposit";


export interface DepositRepository {
    create(deposit: Deposit): Promise<Deposit>;
    update(user_id: string, amount: number): Promise<boolean>;
    getByUser(user_id: string): Promise<Deposit | null>;
}