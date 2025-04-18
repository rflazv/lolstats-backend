import { DateTime } from "luxon";
import { UseCase } from "@core/domain/UseCase";
import { Result, success, fail } from "@core/logic/Result";
import { ICreateUserRequest } from "./models/requests/ICreateUserRequest";
import { CreateUserResponse } from "./models/responses/CreateUserResponse";
import { User } from "@modules/user/domain/User";
import { CreateUserErrors } from "./CreateUserErrors";
import { IUserRepository } from "@modules/user/repository/IUserRepository";
import { UserMappers } from "@modules/user/mappers/UserMappers";
import { Authentication } from "@core/infrastructure/Authentication";


export class CreateUserUsecase implements UseCase<ICreateUserRequest, Promise<CreateUserResponse>> {
    private userRepository: IUserRepository;

    private auth: Authentication;

    constructor(userRepository: IUserRepository, auth: Authentication) {
        this.userRepository = userRepository;
        this.auth = auth;
    }

    async execute(request: ICreateUserRequest): Promise<CreateUserResponse> {
        const { name, email, password } = request;

        const existingUser = await this.userRepository.getUserByEmail(email);
        if (existingUser) {
            console.error("User already exists:", email);
            return fail(Result.fail(CreateUserErrors.UserAlreadyExists.create(email)));
        }

        const firebaseUser = await this.auth.createUser(email, password);
        if (!firebaseUser) {
            console.error("Failed to create user in Firebase Authentication");
            return fail(Result.fail(CreateUserErrors.UnableToCreateUser.create()));
        }

        const userOrError = User.create(
            {
                name,
                email,
                isActive: true,
                createdAt: DateTime.utc().toJSDate(),
                updatedAt: DateTime.utc().toJSDate(),
            },
            null
        );
        if (userOrError.isFailure) {
            console.error("Failed to create user entity");
            return fail(Result.fail(CreateUserErrors.UnableToCreateUser.create()));
        }

        const user = userOrError.getValue();


        await this.userRepository.create(new UserMappers().toPersistence(user));

        console.log("User created:", user);
        return success(Result.ok());
    }
}