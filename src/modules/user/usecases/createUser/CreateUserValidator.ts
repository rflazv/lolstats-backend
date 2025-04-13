import * as yup from 'yup';
import { YupAdapter } from 'adapters/YupAdapter';
import { CreateUserErrors } from './CreateUserErrors';
import { Either } from '@core/logic/Result';
import { IValidator } from '@core/logic/IValidator';

interface ICreateUserValidatorBody {
    name: string;
    email: string;
}

type ValidationResult =  Either<CreateUserErrors.UserAlreadyExists | CreateUserErrors.InvalidName, ICreateUserValidatorBody>;

export class CreateUserValidator {

    private schema = yup.object({
        name: yup.string().required(CreateUserErrors.RequiredName.create().errorValue().message),
        email: yup.string().email(CreateUserErrors.InvalidEmail.create().errorValue().message).required(CreateUserErrors.RequiredEmail.create().errorValue().message),
    });
    
    public async validate(data: ICreateUserValidatorBody): Promise<ValidationResult> {
        const validator = new YupAdapter(this.schema);
        return await validator.validate<ValidationResult>(data);
    }
}