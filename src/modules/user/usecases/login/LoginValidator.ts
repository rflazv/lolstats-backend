import { FailedValidation, YupAdapter } from "@adapters/YupAdapter";
import * as yup from "yup";
import { ILoginRequestBody } from "./models/requests/ILoginRequest";
import { LoginErrors } from "./LoginErrors";
import { Either, fail, success } from "@core/logic/Result";

type ValidationResult = Either<
    | LoginErrors.RequiredEmail
    | LoginErrors.RequiredPassword
    | LoginErrors.InvalidEmail
    | LoginErrors.UnexpectedError,
    ILoginRequestBody
>;


export class LoginValidator {
    private schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    public async validate(data: ILoginRequestBody): Promise<ValidationResult> {
        const validator = new YupAdapter(this.schema);
        const result = await validator.validate(data);

        if (!result.success) {
            const { errors } = result as FailedValidation<ILoginRequestBody>;

            if (errors.name === LoginErrors.RequiredEmail.create().errorValue().message) {
                return fail(LoginErrors.RequiredEmail.create());
            }

            if (errors.name === LoginErrors.RequiredPassword.create().errorValue().message) {
                return fail(LoginErrors.RequiredPassword.create());
            }

            if (errors.name === LoginErrors.InvalidEmail.create().errorValue().message) {
                return fail(LoginErrors.InvalidEmail.create());
            }

            return fail(LoginErrors.UnexpectedError.create());
        }

        return success(result.data);
    }
}