import { Result } from "@core/logic/Result";

export class GetChampionByNameValidator {
  public validate(data: any): Result<void> {
    const { name } = data;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return Result.fail<void>("Nome do campeão é obrigatório e deve ser uma string válida.");
    }

    return Result.ok();
  }
}
