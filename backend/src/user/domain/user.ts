import { Guid } from "guid-typescript";


export class User {
    public id!: string;
    public email!: string;
    public password!: string;

    protected constructor(email: string, password: string, id?: string) {
        if (!id) {
            this.id = Guid.create().toString();
        } else {
            this.id = id;
        }

        this.email = email;
        this.password = password;
    }

    public static Create(email: string, password: string): User {
        return new User(email, password);
    }
}