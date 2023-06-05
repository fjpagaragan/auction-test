import { User } from "../../../src/user/domain/user";
import { UserRepository } from "../../../src/user/domain/interfaces/repositories/user.repository";
import { GetUser } from "../../../src/user/application/use-cases/get-user";
import { CreateUser } from "../../../src/user/application/use-cases/create-user";
import { CreateToken } from "../../../src/user/application/use-cases/create-token";
import { LoginResponse } from "../../../src/user/application/use-cases/dto/login-response";

const mockUser: User = {
    id: "id",
    email: "test@test.com",
    password: "$2a$08$Qk8REoqpSGdp5J90S0WmE.gRd4dH2yU0SDb6eE6MC0z9E4kAScEz."
}


export const mockUserRepository = jest.mocked<UserRepository>({
    create: jest.fn(),
    get: jest.fn(),
});


mockUserRepository.get.mockResolvedValue(mockUser);
mockUserRepository.create.mockResolvedValue(mockUser);

const getUser = new GetUser(mockUserRepository);
const createUser = new CreateUser(mockUserRepository);
const createToken = new CreateToken();


describe("Get User usecase", () => {
    let user: User | null;

    beforeAll(async () => {
        user = await getUser.execute(mockUser.email, "Password123!");
        
    });

    it("should return a user", () => {
        
        expect(user).toEqual(mockUser);
    });

    it("should not return null", () => {
        expect(user).not.toEqual(null);
    });

});

describe("Create User usecase", () => {
    let user: User | null;
    beforeAll(async () => {
        user = await createUser.execute(mockUser.email, "Password123!");
    });

    it("should return email and password properties", () => {
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('password');
    });

    it("should not return an incorrect email", () => {
        expect(user?.email).not.toEqual("test2@email.com");
    });

});

describe("Create token usecase", () => {
    let tokens: LoginResponse;

    beforeAll(async () => {
        const user = await getUser.execute(mockUser.email, "Password123!");
        tokens = await createToken.execute(user!);
    });

    it("should return email and password properties", () => {
        expect(tokens).toHaveProperty('user');
        expect(tokens).toHaveProperty('token');
    });
    
});