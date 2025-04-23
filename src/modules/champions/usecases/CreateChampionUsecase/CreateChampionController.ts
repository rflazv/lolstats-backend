import { Request, Response } from 'express';
import { Controller } from '@core/infrastructure/Controller';
import { CreateChampionUsecase } from './CreateChampionUseCase';
import { CreateChampionValidator } from './CreateChampionValidator';
import { CreateChampionErrors } from './CreateChampionsErrors';

export class CreateChampionController extends Controller {
  private usecase: CreateChampionUsecase;

  private validator: CreateChampionValidator;

  constructor(usecase: CreateChampionUsecase, validator: CreateChampionValidator) {
    super();
    this.usecase = usecase;
    this.validator = validator;
  }


  public executeImplementation = async (req: Request, res: Response) => {
    try {
      const validatedData = await this.validator.validate(req.body);
      if (validatedData.isFail()) {
        const resultError = validatedData.value.errorValue();
        return this.badRequest(res, resultError.message);
      }

      const championData = req.body;
      const result = await this.usecase.execute(championData);
      if (result.isFail()) {
        const resultError = result.value.errorValue();
        const err = resultError.error;

        switch (resultError.constructor) {
          case CreateChampionErrors.ChampionAlreadyExists:
            return this.conflict(res, err.message);
          case CreateChampionErrors.ChampionCreationFailed:
            return this.badRequest(res, err.message);
          default:
            return this.internalServerError(res, err.message);
        }
      }

      return this.created(res);
    } catch (error: any) {
      return this.internalServerError(res, error.message);
    }
  };
}
