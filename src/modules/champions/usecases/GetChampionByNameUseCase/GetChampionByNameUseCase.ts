import { IChampionRepository } from "@modules/champions/repository";
import { UseCase } from "@core/domain/UseCase";
import { IGetChampionByNameRequest } from "./models/requests/GetChampionByNameRequest";
import { Result } from "@core/logic/Result";
import { IChampion } from "@infrastructure/database/mongoose/models/Champion";
import { ChampionNotFoundError, GetChampionByNameFailedError } from "./GetChampionByNameErrors";

export class GetChampionByNameUseCase implements UseCase<IGetChampionByNameRequest, Promise<Result<IChampion>>> {
  constructor(private championRepository: IChampionRepository) {}

  async execute(request: IGetChampionByNameRequest): Promise<Result<IChampion>> {
    try {
      const champion = await this.championRepository.findByName(request.name);

      if (!champion) {
        return Result.fail<IChampion>(ChampionNotFoundError.create(request.name).message);
      }

      return Result.ok<IChampion>(champion);
    } catch (error) {
      return Result.fail<IChampion>(GetChampionByNameFailedError.create().message);
    }
  }
}
