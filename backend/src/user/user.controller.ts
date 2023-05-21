import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUser } from "./application/use-cases/create-user";
import { UserRepositoryDB } from "./data-access/repository/user.repository.db";


class UserController {
    createUser: CreateUser;

    constructor(
        createUser: CreateUser
    ) {
        this.createUser = createUser;
    }

    public create = async (
        req: Request,
        res: Response
    ) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user = await this.createUser.execute(email, password);

            res.status(StatusCodes.CREATED).json(user);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}

export default new UserController(
    new CreateUser(
        new UserRepositoryDB()
    )
);