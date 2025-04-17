import  ChampionRepository  from '../repository/ChampionRepository'; 



class GetChampionByIdUseCase {
    async execute(id: string) {
        return await ChampionRepository.findById(id);
    }
}

export default new GetChampionByIdUseCase();