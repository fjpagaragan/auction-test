import { User } from "../../user";


export interface UserRepository {
    create(user: User): Promise<User>;
    get(email: string, password: string): Promise<User | null>;
}