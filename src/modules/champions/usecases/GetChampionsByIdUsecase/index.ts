import { GetChampionByIdController } from "./GetChampionsByIdController";
import { GetChampionByIdUseCase } from "./GetChampionByIdUseCase";
import { ChampionRepository } from "@modules/champions/repository/ChampionRepository";
import { GetChampionByIdValidator } from "./GetChampionByIdValidator";

const championRepository = new ChampionRepository();
const getChampionByIdValidator = new GetChampionByIdValidator();
const getChampionByIdUseCase = new GetChampionByIdUseCase(championRepository);

const getChampionByIdController = new GetChampionByIdController(
  getChampionByIdUseCase,
  getChampionByIdValidator
);

export { getChampionByIdUseCase, getChampionByIdController };
