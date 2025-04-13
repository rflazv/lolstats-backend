import * as yup from "yup";
import { FailedValidation, YupAdapter } from "adapters/YupAdapter";
import { CreateUserErrors } from "./CreateUserErrors";
import { Either, fail, success } from "@core/logic/Result";
import { ICreateUserRequest } from "./models/requests/ICreateUserRequest";

interface ICreateUserValidatorBody {
  name: string;
  email: string;
}

type ValidationResult = Either<
  | CreateUserErrors.RequiredName
  | CreateUserErrors.RequiredEmail
  | CreateUserErrors.InvalidEmail
  | CreateUserErrors.UnexpectedError,
  ICreateUserRequest
>;

export class CreateUserValidator {
  private schema = yup.object({
    name: yup
      .string()
      .required(CreateUserErrors.RequiredName.create().errorValue().message),
    email: yup
      .string()
      .email(CreateUserErrors.InvalidEmail.create().errorValue().message)
      .required(CreateUserErrors.RequiredEmail.create().errorValue().message),
  });

  public async validate(
    data: ICreateUserValidatorBody
  ): Promise<ValidationResult> {
    const validator = new YupAdapter(this.schema);
    const result = await validator.validate(data);

    if (!result.success) {
        const { errors } = result as FailedValidation<ICreateUserValidatorBody>;
      
        if (errors.name === CreateUserErrors.RequiredName.create().errorValue().message) {
          return fail(CreateUserErrors.RequiredName.create());
        }
      
        if (errors.email === CreateUserErrors.RequiredEmail.create().errorValue().message) {
          return fail(CreateUserErrors.RequiredEmail.create());
        }
      
        if (errors.email === CreateUserErrors.InvalidEmail.create().errorValue().message) {
          return fail(CreateUserErrors.InvalidEmail.create());
        }
      
        return fail(CreateUserErrors.UnexpectedError.create());
    }
      
    return success(result.data);      
  }
}
