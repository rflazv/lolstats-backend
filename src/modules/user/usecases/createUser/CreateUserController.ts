import { Controller } from "@core/infrastructure/Controller";
import { CreateUserUsecase } from "./CreateUserUsecase";
import { CreateUserErrors } from "./CreateUserErrors";
import { Request, Response } from "express";
import { CreateUserValidator } from "./CreateUserValidator";
import { ICreateUserRequest } from "./models/requests/ICreateUserRequest";


export class CreateUserController extends Controller {
    private usecase: CreateUserUsecase;

    private validator: CreateUserValidator;

    constructor(usecase: CreateUserUsecase, validator: CreateUserValidator) {
        super();
        this.usecase = usecase;
        this.validator = validator;
    }

    async executeImplementation(req: Request, res: Response): Promise<Response> {
        try {
            const validatedData = await this.validator.validate(req.body);
            if (validatedData.isFail()) {
                const resultError = validatedData.value.errorValue();
                return this.badRequest(res, resultError.message);
            }

            const result = await this.usecase.execute(validatedData.value);
            if (result.isFail()) {
                const resultError = result.value.errorValue();
                const err = resultError.error;

                switch (resultError.constructor) {
                    case CreateUserErrors.UserAlreadyExists:
                        return this.conflict(res, err.message);
                    case CreateUserErrors.UnableToCreateUser:
                        return this.badRequest(res, err.message);
                    default:
                        return this.internalServerError(res, err.message);
                }
            }

            return this.created(res);
        } catch (err) {
            console.error(`[CreateUserController]: Uncaught controller error`, err);
            return this.internalServerError(res, err.message);
        }
    }
}