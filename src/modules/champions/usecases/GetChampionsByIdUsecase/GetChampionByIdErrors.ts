export class ChampionNotFoundError extends Error {
  private constructor(message: string) {
    super(message);
    this.name = "Campeão não encontrado";
  }

  public static create(id: string): ChampionNotFoundError {
    return new ChampionNotFoundError(`Campeão com o ID '${id}' não foi encontrado.`);
  }
}

export class GetChampionByIdFailedError extends Error {
  private constructor(message: string) {
    super(message);
    this.name = "Erro ao buscar o campeão por ID";
  }

  public static create(): GetChampionByIdFailedError {
    return new GetChampionByIdFailedError("Erro ao buscar o campeão por ID.");
  }
}
