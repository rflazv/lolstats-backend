import { championRepository } from "@modules/champions/repository";
import { CreateChampionUsecase } from "./CreateChampionUseCase";
import { CreateChampionController } from "./CreateChampionController";
import { CreateChampionValidator } from "./CreateChampionValidator";

const createChampionUsecase = new CreateChampionUsecase(championRepository);
const createChampionValidator = new CreateChampionValidator();
const createChampionController = new CreateChampionController(
  createChampionUsecase,
  createChampionValidator
);

export { createChampionUsecase, createChampionController };