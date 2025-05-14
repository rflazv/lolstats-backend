import { IChampion } from "@infrastructure/database/mongoose/models/Champion";
import { Result } from "@core/logic/Result";

export type GetAllChampionsResponse = Result<IChampion[]>;
