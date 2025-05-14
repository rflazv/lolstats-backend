export class ChampionNotFoundError extends Error {
  constructor() {
    super('Campeão não encontrado');
    this.name = 'ChampionNotFoundError';
  }

  static create() {
    return new ChampionNotFoundError();
  }
}

export class UpdateChampionFailedError extends Error {
  constructor() {
    super('Erro ao atualizar campeão');
    this.name = 'UpdateChampionFailedError';
  }

  static create() {
    return new UpdateChampionFailedError();
  }
}
