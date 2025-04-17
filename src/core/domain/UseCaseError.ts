
interface IUseCaseError {
    message: string;
    error?: any;
}

export abstract class UseCaseError implements IUseCaseError {
    public readonly message: string;

    public readonly error: any | Error;

    constructor(message: string, err?: any | Error) {
        this.message = message;
        this.error = err;
    }
}