import { Result } from "@core/logic/Result";
import { UseCaseError } from "@core/domain/UseCaseError";

export namespace CreateUserErrors {
    export class UserAlreadyExists extends Result<UseCaseError> {
        constructor(email: string) {
            super(false, {
                message: `User with email ${email} already exists.`,
            } as UseCaseError);
        }

        static create(email: string): Result<UseCaseError> {
            return new UserAlreadyExists(email);
        }
    }

    export class RequiredName extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Name is required.`,
            } as UseCaseError);
        }
        static create(): Result<UseCaseError> {
            return new RequiredName();
        }
    }

    export class RequiredEmail extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Email is required.`,
            } as UseCaseError);
        }
        static create(): Result<UseCaseError> {
            return new RequiredEmail();
        }
    }

    export class InvalidEmail extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Invalid email format.`,
            } as UseCaseError);
        }

        static create(): Result<UseCaseError> {
            return new InvalidEmail();
        }
    }

    export class InvalidName extends Result<UseCaseError> {
        constructor(name: string) {
            super(false, {
                message: `Invalid name format: ${name}.`,
            } as UseCaseError);
        }
    }

    export class UnableToCreateUser extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Unable to create user.`,
            } as UseCaseError);
        }

        static create(): Result<UseCaseError> {
            return new UnableToCreateUser();
        }
    }
}