import { Request, Response } from "express";
import { Controller } from "@core/infrastructure/Controller";
import { LoginUsecase } from "./LoginUsecase";
import { LoginValidator } from "./LoginValidator";
import { LoginErrors } from "./LoginErrors";




export class LoginController extends Controller {
    private usecase: LoginUsecase;

    private validator: LoginValidator;

    constructor(usecase: LoginUsecase, validator: LoginValidator) {
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
                    case LoginErrors.InvalidCredentials:
                        return this.unauthorized(res, err.message);
                    case LoginErrors.UserNotFound:
                        return this.notFound(res, err.message);
                    default:
                        return this.internalServerError(res, err.message);
                }
            }

            return this.ok(res, result.value.getValue());
        } catch (err) {
            console.error(`[LoginController]: Uncaught controller error`, err);
            return this.internalServerError(res, err.message);
        }
    }
}