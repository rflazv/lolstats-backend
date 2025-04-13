import { Controller } from "@core/infrastructure/Controller";
import { CreateUserUsecase } from "./CreateUserUsecase";
import { CreateUserErrors } from "./CreateUserErrors";
import { Request, Response } from "express";
import { CreateUserValidator } from "./CreateUserValidator";


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
            const validatedData = await this.getValidatedData(req.body, this.validator);
            const result = await this.usecase.execute(validatedData);
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
            return this.internalServerError(res, err.message);
        }
    }
}