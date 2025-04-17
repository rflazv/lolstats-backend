export class ChampionErrors {
    static ChampionAlreadyExists(name: string) {
      return `O campeão com o nome ${name} já existe.`;
    }
  
    static InvalidChampionData() {
      return `Dados do campeão fornecido inválidos.`;
    }
  
    static ChampionCreationFailed() {
      return `Falha ao criar campeão.`;
    }
  }