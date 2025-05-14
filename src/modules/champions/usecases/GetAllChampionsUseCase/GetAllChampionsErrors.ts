export class GetAllChampionsErrors {
    static UnexpectedError = class extends Error {
      static create() {
        return new GetAllChampionsErrors.UnexpectedError();
      }
  
      constructor() {
        super("Ocorreu um erro inesperado ao buscar todos os campeões.");
        this.name = "Erro inesperado";
      }
    };
  }
  