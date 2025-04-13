import { DateTime } from "luxon";
import { UseCase } from "@core/domain/UseCase";
import { Result, success, fail } from "@core/logic/Result";
import { ICreateUserRequest } from "./models/requests/ICreateUserRequest";
import { CreateUserResponse } from "./models/responses/CreateUserResponse";
import { User } from "@modules/user/domain/User";
import { CreateUserErrors } from "./CreateUserErrors";
import { IUserRepository } from "@modules/user/repository/IUserRepository";


export class CreateUserUsecase implements UseCase<ICreateUserRequest, Promise<CreateUserResponse>> {
    private userRepository: IUserRepository;


    async execute(request: ICreateUserRequest): Promise<CreateUserResponse> {
        const { name, email } = request;
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
            return fail(Result.fail(CreateUserErrors.UnableToCreateUser.create()));
        }

        const user = userOrError.getValue();
        const existingUser = await this.userRepository.getUserByEmail(user.email);
        if (existingUser) {
            return fail(Result.fail(CreateUserErrors.UserAlreadyExists.create(user.email)));
        }

        await this.userRepository.create(user.name, user.email);

        console.log("User created:", user);
        return success(Result.ok());
    }
}