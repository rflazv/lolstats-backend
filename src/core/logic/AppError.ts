export class AppError extends Error {
    public statusCode: string | number;
    public message: string;
    public code: string;

    constructor(statusCode: string | number, message: string, code: string = 'BAD_REQUEST') {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.code = code;
    }
}