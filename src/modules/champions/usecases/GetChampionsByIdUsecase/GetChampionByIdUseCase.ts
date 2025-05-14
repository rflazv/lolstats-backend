import { IChampionRepository } from "@modules/champions/repository";
import { UseCase } from "@core/domain/UseCase";
import { IGetChampionByIdRequest } from "./models/requests/GetChampionByIdRequest";
import { GetChampionByIdResponse } from "./models/responses/GetChampionByIdResponse";
import { Result } from "@core/logic/Result";
import { IChampion } from "@infrastructure/database/mongoose/models/Champion";

export class GetChampionByIdUseCase implements UseCase<IGetChampionByIdRequest, Promise<GetChampionByIdResponse>> {
  constructor(private championRepository: IChampionRepository) {}

  async execute(request: IGetChampionByIdRequest): Promise<GetChampionByIdResponse> {
    try {
      const champion = await this.championRepository.findById(request.id);

      if (!champion) {
        return Result.fail<IChampion>('Campeão não encontrado');
      }

      return Result.ok<IChampion>(champion);
    } catch (error) {
      return Result.fail<IChampion>('Erro ao buscar campeão');
    }
  }
}
