import { Result } from "@core/logic/Result";
import { ChampionNotFound, ChampionDeletionFailed } from "../../DeleteChampionErrors";

type DeleteChampionSuccess = { message: string; id: string };
type DeleteChampionError = ChampionNotFound | ChampionDeletionFailed;

export type DeleteChampionResponse = Result<DeleteChampionSuccess> | Result<DeleteChampionError>;
