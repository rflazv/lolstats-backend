import { Either, Result } from "@core/logic/Result";
import { CreateChampionErrors } from "../../CreateChampionsErrors";


export type CreateChampionResponse = Either<
    CreateChampionErrors.ChampionAlreadyExists |
    CreateChampionErrors.InvalidChampionData |
    CreateChampionErrors.ChampionCreationFailed,
    Result<void>
>