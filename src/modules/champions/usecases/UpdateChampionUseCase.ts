import ChampionRepository from '../repository/ChampionRepository';
import { IChampion } from "@infrastructure/database/mongoose/models/Champion";

class UpdateChampionUseCase {
    async execute(id: string, data: Partial<IChampion>) {
        return await ChampionRepository.update(id, data);
    }
}

export default new UpdateChampionUseCase();
