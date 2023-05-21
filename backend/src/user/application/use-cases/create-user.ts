import { User } from "../../../user/domain/user";
import { UserRepository } from "../../../user/domain/interfaces/repositories/user.repository";
import bcrypt from "bcryptjs";



export class CreateUser {
    userRepository: UserRepository;

    constructor (
        userRepository: UserRepository
    ) {
        this.userRepository = userRepository;
    }

    async execute(email: string, password: string): Promise<User | null> {
        const hashPassword = await bcrypt.hash(password, 8);

        const user = await this.userRepository.create(User.Create(email, hashPassword));

        return user;
    }
}