import { IChampionRepository } from "@modules/champions/repository";
import { UseCase } from "@core/domain/UseCase";
import { GetAllChampionsResponse } from "./models/responses/GetAllChampionsResponse";
import { Result } from "@core/logic/Result";
import { GetAllChampionsErrors } from "./GetAllChampionsErrors";
import { IChampion } from "@infrastructure/database/mongoose/models/Champion";
import { IGetAllChampionsRequest } from "./models/requests/GetAllChampionsRequest";

export class GetAllChampionsUseCase implements UseCase<IGetAllChampionsRequest, Promise<GetAllChampionsResponse>> {
    constructor(private championRepository: IChampionRepository) {}

    async execute(request: IGetAllChampionsRequest): Promise<GetAllChampionsResponse> {
        try {
            const {
                tags,
                page = 1,
                limit = 10,
                search,
                sortBy = 'name',
                sortOrder = 'asc',
            } = request;

            let champions = await this.championRepository.findAll();

            if (tags && tags.length > 0) {
                champions = champions.filter(champion =>
                    champion.tags?.some((tag: string) => tags.includes(tag))
                );
            }

            if (search) {
                const regex = new RegExp(search, 'i');
                champions = champions.filter(champion => regex.test(champion.name));
            }

            champions.sort((a: any, b: any) => {
                if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
                if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });

            const start = (page - 1) * limit;
            const paginated = champions.slice(start, start + limit);

            return Result.ok<IChampion[]>(paginated);
        } catch (err) {
            return Result.fail<IChampion[]>(GetAllChampionsErrors.UnexpectedError.create());
        }
    }
}
