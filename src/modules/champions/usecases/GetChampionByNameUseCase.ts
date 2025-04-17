import  ChampionRepository  from '../repository/ChampionRepository';

class GetChampionByNameUseCase {
  async execute(name: string) {
    return await ChampionRepository.findByName(name);
  }
}

export default new GetChampionByNameUseCase(); 
