import { Request, Response } from "express";
import { DepositRepository } from "./domain/interfaces/repositories/deposit.repository";
import { JwtPayload } from "jsonwebtoken";
import { decodeToken } from "../common/utils/auth";
import { GetUserDeposit } from "./application/get-user-deposit";
import { StatusCodes } from "http-status-codes";
import { Deposit } from "./domain/deposit";
import { DepositRepositoryDB } from "./data-access/repository/deposit.repository.db";
import { AddDeposit } from "./application/add-deposit";


class DepositController {
    depositRepository: DepositRepository;

    constructor (
        depositRepository: DepositRepository,
    ) {
        this.depositRepository = depositRepository;
    }

    public getByUserId = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const token: JwtPayload = await decodeToken(req.header('Authorization')!) as JwtPayload;

            const result = await new GetUserDeposit(this.depositRepository).execute(token.id);
            const deposit = result ?? Deposit.Create(token.id, 0);

            res.status(StatusCodes.OK).json(deposit);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    public makeDeposit = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const token: JwtPayload = await decodeToken(req.header('Authorization')!) as JwtPayload;
            const amount = req.body.amount;

            const deposit = await new AddDeposit(this.depositRepository).execute(token.id, amount);

            res.status(StatusCodes.OK).json(deposit);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}

export default new DepositController(
    new DepositRepositoryDB()
)