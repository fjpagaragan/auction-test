import { secretKey } from "../../../common/config/token.config";
import { User } from "../../../user/domain/user";
import jwt from 'jsonwebtoken';
import { LoginResponse } from "./dto/login-response";


export class CreateToken {
    private secretKey!: string;

    constructor() {
        this.secretKey = `${secretKey}`;
    }

    async execute(user: User): Promise<LoginResponse> {

        const token = jwt.sign({ id: user.id, email: user.email }, this.secretKey, { expiresIn: '7 days'});

        return {
            user,
            token
        }

    }
}