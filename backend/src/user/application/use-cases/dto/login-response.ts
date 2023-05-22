import { User } from "../../../../user/domain/user";

export interface LoginResponse {
    user: User;
    token: string;
}