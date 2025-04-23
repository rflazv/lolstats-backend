import { ICreateChampionRequest } from "./models/requests/CreateChampionRequest";
import { IChampionRepository } from "@modules/champions/repository";
import { UseCase } from "@core/domain/UseCase";
import { CreateChampionErrors } from "./CreateChampionsErrors";
import { Result, fail } from "@core/logic/Result";
import { CreateChampionResponse } from "./models/responses/CreateChampionResponse";

export class CreateChampionUsecase implements UseCase<ICreateChampionRequest, Promise<CreateChampionResponse>>{
  private championRepository: IChampionRepository;

  constructor(championRepository: IChampionRepository) {
    this.championRepository = championRepository;
  }

  public async execute(championData: ICreateChampionRequest): Promise<CreateChampionResponse> {
    const existingChampion = await this.championRepository.findByName(championData.name);
    if (existingChampion) {
      return fail(Result.fail(CreateChampionErrors.ChampionAlreadyExists.create(championData.name)));
    }

    try {
      return this.championRepository.create(championData);
    } catch (error) {
      fail(Result.fail(CreateChampionErrors.ChampionCreationFailed.create()));
    }
  }
}
