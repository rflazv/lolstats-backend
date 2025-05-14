import { Request, Response } from "express";
import { GetChampionByIdUseCase } from "./GetChampionByIdUseCase";
import { GetChampionByIdValidator } from "./GetChampionByIdValidator";

export class GetChampionByIdController {
  constructor(
    private getChampionByIdUseCase: GetChampionByIdUseCase,
    private getChampionByIdValidator: GetChampionByIdValidator
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const validationResult = this.getChampionByIdValidator.validate({ id });
    if (validationResult.isFailure) {
      return res.status(400).json({ error: validationResult.getError() });
    }

    const result = await this.getChampionByIdUseCase.execute({ id });

    if (result.isFailure) {
      return res.status(404).json({ error: result.getError() });
    }

    return res.status(200).json(result.getValue());
  }
}
