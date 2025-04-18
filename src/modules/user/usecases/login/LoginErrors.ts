import { Result } from "@core/logic/Result";
import { UseCaseError } from "@core/domain/UseCaseError";


export namespace LoginErrors {
    export class InvalidCredentials extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Invalid credentials.`,
            } as UseCaseError);
        }

        static create(): Result<UseCaseError> {
            return new InvalidCredentials();
        }
    }

    export class UserNotFound extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `User not found.`,
            } as UseCaseError);
        }

        static create(): Result<UseCaseError> {
            return new UserNotFound();
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

    export class RequiredPassword extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Password is required.`,
            } as UseCaseError);
        }

        static create(): Result<UseCaseError> {
            return new RequiredPassword();
        }
    }

    export class InvalidEmail extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Invalid email.`,
            } as UseCaseError);
        }

        static create(): Result<UseCaseError> {
            return new InvalidEmail();
        }
    }

    export class UnexpectedError extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Unexpected error.`,
            } as UseCaseError);
        }

        static create(): Result<UseCaseError> {
            return new UnexpectedError();
        }
    }
}