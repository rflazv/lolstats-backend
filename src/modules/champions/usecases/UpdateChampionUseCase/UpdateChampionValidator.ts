import { Result } from "@core/logic/Result";

export class UpdateChampionValidator {
  public validate(data: any): Result<void> {
    const { id, data: championData } = data;

    // Validando ID
    if (!id || typeof id !== "string" || id.trim().length === 0) {
      return Result.fail<void>("ID do campeão é obrigatório e deve ser uma string válida.");
    }

    // Validando dados do campeão
    if (!championData || typeof championData !== "object") {
      return Result.fail<void>("Os dados do campeão devem ser um objeto válido.");
    }

    // Adicionar validações adicionais para os campos do campeão, se necessário
    // Exemplo: Validar nome, descrição, etc.

    return Result.ok();
  }
}
