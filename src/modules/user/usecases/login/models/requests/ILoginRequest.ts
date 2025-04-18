export interface ILoginRequest extends ILoginRequestBody {}

export interface ILoginRequestBody {
  email: string;
  password: string;
}