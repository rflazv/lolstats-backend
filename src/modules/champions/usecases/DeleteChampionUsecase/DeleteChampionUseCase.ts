import { Result } from "@core/logic/Result";
import { UseCase } from "@core/domain/UseCase";
import { IChampionRepository } from "@modules/champions/repository";
import { ChampionNotFound, ChampionDeletionFailed } from "./DeleteChampionErrors";
import { IDeleteChampionRequest } from "./models/requests/DeleteChampionRequest";
import { DeleteChampionResponse } from "./models/responses/DeleteChampionResponse";

export class DeleteChampionUseCase implements UseCase<IDeleteChampionRequest, Promise<DeleteChampionResponse>> {
  constructor(private championRepository: IChampionRepository) {}

  public async execute(data: IDeleteChampionRequest): Promise<DeleteChampionResponse> {
    const { id } = data;

    const championExists = await this.championRepository.findById(id);
    if (!championExists) {
      return Result.fail(ChampionNotFound.create(id));
    }

    try {
      await this.championRepository.delete(id);
      return Result.ok({ message: "Campeão deletado com sucesso.", id });
    } catch (error) {
      return Result.fail(ChampionDeletionFailed.create());
    }
  }
}
