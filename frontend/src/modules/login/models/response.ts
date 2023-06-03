

export interface User {
    email: string;
    password: string;
}

export interface UserApiParameters {
    user: User;
}

export interface CreateUserResponse extends User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthenticateUserResponse {
    user: CreateUserResponse;
    token: string;
}
