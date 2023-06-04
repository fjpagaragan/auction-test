import { User } from "../../../user/domain/user";
import { UserRepository } from "../../../user/domain/interfaces/repositories/user.repository";
import UserModel from "../model/user.model";
import CustomError from "../../../../src/common/utils/custom-error";
import { StatusCodes } from "http-status-codes";
import { ErrorTypeKeys } from "../../../../src/common/utils/custom-error";


export class UserRepositoryDB implements UserRepository {
    async create(user: User): Promise<User> {
        try {
            return await UserModel.create(user);   
        } catch (error) {
            throw new CustomError(StatusCodes.BAD_REQUEST, "Email Already Exist", ErrorTypeKeys.BAD_REQUEST)
        }
    }

    async get(email: string): Promise<User | null> {
        return await UserModel.findOne({
            where: { email }
        }) 
    }
}