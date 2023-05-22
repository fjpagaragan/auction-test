import { BadRequestError } from "../../../../common/utils/bad-request-error";

export class UserNotFoundError extends BadRequestError {
    public detail!: string;

    constructor(message: string) {
        super(message);
        this.detail = "Email not found";
    }
}