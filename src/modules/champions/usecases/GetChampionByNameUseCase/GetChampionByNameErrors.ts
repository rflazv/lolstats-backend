export class ChampionNotFoundError extends Error {
  constructor(name: string) {
    super(`Campeão com o nome "${name}" não foi encontrado.`);
    this.name = "ChampionNotFoundError";
  }

  static create(name: string): ChampionNotFoundError {
    return new ChampionNotFoundError(name);
  }
}

export class GetChampionByNameFailedError extends Error {
  constructor() {
    super("Erro ao buscar campeão pelo nome.");
    this.name = "GetChampionByNameFailedError";
  }

  static create(): GetChampionByNameFailedError {
    return new GetChampionByNameFailedError();
  }
}
