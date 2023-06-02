import _, { isEmpty } from "lodash";
import { Bid } from "../domain/bid";
import { BidAttributes } from "../domain/interfaces/bid-attribute";
import { BidRepository } from "../domain/interfaces/repositories/bid.repository";
import CustomError, { ErrorTypeKeys } from "../../../src/common/utils/custom-error";
import { StatusCodes } from "http-status-codes";
import { DepositRepository } from "../../../src/deposit/domain/interfaces/repositories/deposit.repository";
import { GetUserDeposit } from "../../../src/deposit/application/get-user-deposit";
import { AddDeposit } from "../../deposit/application/add-deposit";
import { Item } from "../../../src/item/domain/item";
import { SubtractDeposit } from "../../../src/deposit/application/subtract-deposit";


export class CreateBid {
    bidRepository: BidRepository;
    depositRepository: DepositRepository;

    constructor (
        bidRepository: BidRepository,
        depositRepository: DepositRepository,
    ) {
        this.bidRepository = bidRepository;
        this.depositRepository = depositRepository;
    }

    async execute(bid: BidAttributes, item: Item): Promise<Bid> {
        // Check user balance
        const balance = await new GetUserDeposit(this.depositRepository).execute(bid.user_id);
        if (isEmpty(balance)) {
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "Insufficient balance.", ErrorTypeKeys.INTERNAL_SERVER_ERROR);
        }
        // Check if balance is sufficient
        const newBalance = balance.amount - bid.amount;
        if (!_.gte(newBalance, 0)) {
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "Insufficient balance.", ErrorTypeKeys.INTERNAL_SERVER_ERROR);
        }

        // Get Check amounts if greater than current price
        if (!_.gt(bid.amount, item.current_price)) {
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "New bid price should be greater than current price of item.", ErrorTypeKeys.BAD_REQUEST);
        }

        // Create Bid
        const toCreateBid = Bid.Create(bid);
        const created = await this.bidRepository.create(toCreateBid);
        new SubtractDeposit(this.depositRepository).execute(created.user_id, newBalance);

        return created;
    }
}