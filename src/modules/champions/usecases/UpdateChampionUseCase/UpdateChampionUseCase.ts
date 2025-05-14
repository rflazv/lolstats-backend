import { IChampionRepository } from "@modules/champions/repository/IChampionRepository";
import { UpdateChampionRequest } from "./models/requests/UpdateChampionRequest";
import { Result } from "@core/logic/Result";
import { ChampionNotFoundError, UpdateChampionFailedError } from "./UpdateChampionErrors";
import { IChampion } from "@infrastructure/database/mongoose/models/Champion";

export class UpdateChampionUseCase {
  constructor(private championRepository: IChampionRepository) {}

  async execute(
    request: UpdateChampionRequest
  ): Promise<Result<IChampion>> {
    const { id, data } = request;

    try {
      const updatedChampion = await this.championRepository.update(id, data);

      if (!updatedChampion) {
        return Result.fail<IChampion>(ChampionNotFoundError.create());
      }

      return Result.ok<IChampion>(updatedChampion);
    } catch (error) {
      return Result.fail<IChampion>(UpdateChampionFailedError.create());
    }
  }
}
