import { User } from "../../../user/domain/user";
import { UserRepository } from "../../../user/domain/interfaces/repositories/user.repository";
import UserModel from "../model/user.model";


export class UserRepositoryDB implements UserRepository {
    async create(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    async get(email: string, password: string): Promise<User | null> {
        return await UserModel.findOne({
            where: { email, password}
        }) 
    }
}