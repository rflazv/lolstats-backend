import { UseCase } from "@core/domain/UseCase";
import { Result, success, fail } from "@core/logic/Result";
import { Authentication } from "@core/infrastructure/Authentication";
import { IUserRepository } from "@modules/user/repository";
import { LoginErrors } from "./LoginErrors";
import { LoginResponse } from "./models/responses/LoginResponse";

export class LoginUsecase implements UseCase<any, Promise<any>> {
    private userRepository: IUserRepository;

    private auth: Authentication;

    constructor(userRepository: IUserRepository, auth: Authentication) {
        this.userRepository = userRepository;
        this.auth = auth;
    }

    async execute(request: any): Promise<LoginResponse> {
        const { email, password } = request;

        // Validate the user credentials
        const authToken = await this.auth.signIn(email, password);
        if (!authToken) {
            console.error("Invalid credentials");
            return fail(Result.fail(LoginErrors.InvalidCredentials.create()));
        }

        // Fetch the user from the repository
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            console.error("User not found");
            return fail(Result.fail(LoginErrors.UserNotFound.create()));
        }

        console.log("User logged in:", user);
        return success(Result.ok({ token: authToken })); // Return the token
    }
}