import { User } from "../../../user/domain/user";
import { UserRepository } from "../../../user/domain/interfaces/repositories/user.repository";
import bcrypt from "bcryptjs";
import { UserNotFoundError } from "./errors/user-not-found";
import { PasswordNotMatch } from "./errors/password-not-match";

export class GetUser {
    userRepository: UserRepository;

    constructor (
        userRepository: UserRepository,
    ) {
        this.userRepository = userRepository;
    }

    async execute(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.get(email);

        if (!user) {
            throw new UserNotFoundError('Email not Found!');
        }
        const hashPassword = await bcrypt.hash(user.password, 8);
        const match = bcrypt.compare(hashPassword, password);

        if (!match) {
            throw new PasswordNotMatch('Invalid Password!');
        }

        return user;
    }
}