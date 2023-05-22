import { StatusCodes } from "http-status-codes";

export class BadRequestError extends Error {
    public readonly status!: StatusCodes;

    constructor(message?: string) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
    }
}
