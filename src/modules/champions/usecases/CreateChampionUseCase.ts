import ChampionValidator from "../validators/ChampionValidator";
import ChampionRepository from '../repository/ChampionRepository';
import { ChampionErrors } from "../errors/ChampionErrors";  

class CreateChampionUseCase {
  private championRepository = ChampionRepository;

  public async execute(championData: any) {
    const validationResult = await ChampionValidator.validate(championData);

    if (validationResult.length > 0) {
      throw new Error(validationResult.join(", "));
    }

    const existingChampion = await this.championRepository.findByName(championData.name);
    if (existingChampion) {
      throw new Error(ChampionErrors.ChampionAlreadyExists(championData.name));
    }

    try {
      const newChampion = await this.championRepository.create(championData);
      return newChampion;
    } catch (error) {
      throw new Error(ChampionErrors.ChampionCreationFailed());
    }
  }
}

export default new CreateChampionUseCase();
