import  ChampionRepository  from '../repository/ChampionRepository';

class GetAllChampionsUseCase {
    async execute() {
        const champions = await ChampionRepository.findAll(); 
        return champions;
    }
}

export default new GetAllChampionsUseCase();
