import { Guid } from "guid-typescript";


export class Deposit {
    public id!: string;
    public user_id!: string;
    public amount!: number;

    private constructor (user_id: string, amount: number, id?: string) {
        
        this.id = !id ? Guid.create().toString() : id;
        this.user_id = user_id;
        this.amount = amount;
    }

    public static Create(user_id: string, amount: number): Deposit {
        return new Deposit(user_id, amount);
    }

    public static Load(id: string, user_id: string, amount: number): Deposit {
        return new Deposit(user_id, amount, id);
    }
}