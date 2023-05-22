import { BadRequestError } from "../../../../common/utils/bad-request-error";

export class PasswordNotMatch extends BadRequestError {
    public detail!: string;

    constructor(message: string) {
        super(message);
        this.detail = "Password does not match";
    }
}