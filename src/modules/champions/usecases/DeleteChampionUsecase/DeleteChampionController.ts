import { Request, Response } from "express";
import { DeleteChampionUseCase } from "./DeleteChampionUseCase";
import { DeleteChampionValidator } from "./DeleteChampionValidator";

export class DeleteChampionController {
  constructor(
    private deleteChampionUseCase: DeleteChampionUseCase,
    private deleteChampionValidator: DeleteChampionValidator
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validation = this.deleteChampionValidator.validate(req.params);
      if (validation.isFailure) {
        return res.status(400).json({ error: validation.getError() });
      }

      const { id } = req.params;
      const result = await this.deleteChampionUseCase.execute({ id });

      if (result.isFailure) {
        return res.status(404).json({ error: result.getError() });
      }

      return res.status(200).json(result.getValue());
    } catch (error) {
      console.error("Erro ao deletar campeão:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
}
