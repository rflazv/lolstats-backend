import { ChampionRepository } from "./ChampionRepository";
import { IChampionRepository } from "./IChampionRepository";
const championRepository = new ChampionRepository();


export {
    championRepository,
    IChampionRepository,
}