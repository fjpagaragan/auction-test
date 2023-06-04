import { User } from "../../../user/domain/user";
import { UserRepository } from "../../../user/domain/interfaces/repositories/user.repository";
import bcrypt from "bcryptjs";
import { PasswordNotMatch } from "./errors/password-not-match";
import CustomError, { ErrorTypeKeys } from "../../../../src/common/utils/custom-error";
import { StatusCodes } from "http-status-codes";

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
            throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid username / password.", ErrorTypeKeys.BAD_REQUEST);
        }
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid username / password.", ErrorTypeKeys.BAD_REQUEST);
        }
        
        return user;
    }
}