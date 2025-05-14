import { Result } from "@core/logic/Result";

export class DeleteChampionValidator {
  public validate(data: any): Result<void> {
    const { id } = data;

    if (!id || typeof id !== "string" || id.trim().length === 0) {
      return Result.fail<void>("ID do campeão é obrigatório.");
    }

    return Result.ok<void>();
  }
}
