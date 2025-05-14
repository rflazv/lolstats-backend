export class ChampionNotFound extends Error {
  constructor(id: string) {
      super(`Campeão com o id ${id} não encontrado.`);
      this.name = 'Campeão não encontrado';
  }

  static create(id: string): ChampionNotFound {
      return new ChampionNotFound(id);
  }
}

export class ChampionDeletionFailed extends Error {
  constructor() {
      super('Erro ao excluir campeão.');
      this.name = 'Falha ao deletar campeão';
  }

  static create(): ChampionDeletionFailed {
      return new ChampionDeletionFailed();
  }
}

