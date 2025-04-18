import { Either, Result } from "@core/logic/Result";
import { LoginErrors } from "@modules/user/usecases/login/LoginErrors";



export type LoginResponse = Either<
    | LoginErrors.InvalidCredentials
    | LoginErrors.UserNotFound
    | LoginErrors.UnexpectedError,
    Result<{ token: string }>
>;