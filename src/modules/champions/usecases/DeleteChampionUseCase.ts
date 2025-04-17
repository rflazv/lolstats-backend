import  ChampionRepository  from '../repository/ChampionRepository';

class DeleteChampionUseCase {
    async execute(id: string) {
        return await ChampionRepository.delete(id);
    }
}

export default new DeleteChampionUseCase();