import { Either, Result } from "@core/logic/Result";
import { GenericAppError } from "@core/types/GenericAppError";
import { CreateUserErrors } from "@modules/user/usecases/createUser/CreateUserErrors";

export type CreateUserResponse = Either<
    CreateUserErrors.UnableToCreateUser |
    CreateUserErrors.UserAlreadyExists |
    CreateUserErrors.InvalidEmail |
    CreateUserErrors.InvalidName |
    GenericAppError.ResourceNotFound |
    GenericAppError.UnexpectedError,
    Result<void>
>;