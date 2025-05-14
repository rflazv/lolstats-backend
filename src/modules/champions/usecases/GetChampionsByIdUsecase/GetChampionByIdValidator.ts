import { Result } from "@core/logic/Result";

export class GetChampionByIdValidator {
  public validate(data: any): Result<void> {
    const { id } = data;

    if (!id || typeof id !== "string" || id.trim().length === 0) {
      return Result.fail<void>("ID do campeão é obrigatório e deve ser uma string válida.");
    }

    return Result.ok();
  }
}
