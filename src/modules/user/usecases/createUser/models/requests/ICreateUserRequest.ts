export interface ICreateUserRequest extends ICreateUserRequestBody {}

export interface ICreateUserRequestBody {
    name: string;
    email: string;
    password: string;
}