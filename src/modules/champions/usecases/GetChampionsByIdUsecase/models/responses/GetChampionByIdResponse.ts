import { Result } from "@core/logic/Result";
import { IChampion } from "@infrastructure/database/mongoose/models/Champion";

export type GetChampionByIdResponse = Result<IChampion>;
