import { Request, Response } from "express";
import { GetChampionByNameUseCase } from "./GetChampionByNameUseCase";
import { GetChampionByNameValidator } from "./GetChampionByNameValidator";

export class GetChampionByNameController {
  constructor(
    private getChampionByNameUseCase: GetChampionByNameUseCase,
    private getChampionByNameValidator: GetChampionByNameValidator
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const validation = this.getChampionByNameValidator.validate(req.params);
    if (validation.isFailure) {
      return res.status(400).json({ error: validation.getError() });
    }

    const { name } = req.params;

    const result = await this.getChampionByNameUseCase.execute({ name });

    if (result.isFailure) {
      return res.status(404).json({ error: result.getError() });
    }

    return res.status(200).json(result.getValue());
  }
}
