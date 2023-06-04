import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUser } from "./application/use-cases/create-user";
import { UserRepositoryDB } from "./data-access/repository/user.repository.db";
import { UserRepository } from "./domain/interfaces/repositories/user.repository";
import { GetUser } from "./application/use-cases/get-user";
import { CreateToken } from "./application/use-cases/create-token";
import { UserNotFoundError } from "./application/use-cases/errors/user-not-found";
import { PasswordNotMatch } from "./application/use-cases/errors/password-not-match";


class UserController {
    userRepository: UserRepository;

    constructor(
        userRepository: UserRepository
    ) {
        this.userRepository = userRepository;
    }

    public create = async (
        req: Request,
        res: Response
    ) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user = await new CreateUser(this.userRepository).execute(email, password);

            res.status(StatusCodes.CREATED).json(user);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    public authenticate = async (
        req: Request,
        res: Response
    ) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user = await new GetUser(this.userRepository).execute(email, password);

            if (user) {
                const token = await new CreateToken().execute(user);

                res.status(StatusCodes.OK).json(token);
            } else {
                res.status(StatusCodes.NOT_FOUND).json({"message": "User not found!"});
            }
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}

export default new UserController(
    new UserRepositoryDB()
);