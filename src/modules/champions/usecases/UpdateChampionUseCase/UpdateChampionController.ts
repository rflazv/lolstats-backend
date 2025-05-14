import { Request, Response } from "express";
import { UpdateChampionUseCase } from "./UpdateChampionUseCase";
import { UpdateChampionValidator } from "./UpdateChampionValidator";

export class UpdateChampionController {
  constructor(
    private updateChampionUseCase: UpdateChampionUseCase,
    private updateChampionValidator: UpdateChampionValidator
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    // Validação de entrada
    const validationResult = this.updateChampionValidator.validate({ id, data });
    if (validationResult.isFailure) {
      return res.status(400).json({ error: validationResult.getError() });
    }

    // Execução do UseCase
    const result = await this.updateChampionUseCase.execute({ id, data });

    if (result.isFailure) {
      return res.status(404).json({ error: result.getError() });
    }

    return res.status(200).json(result.getValue());
  }
}
