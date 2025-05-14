import { championRepository } from "@modules/champions/repository";
import { GetChampionByNameUseCase } from "./GetChampionByNameUseCase";
import { GetChampionByNameController } from "./GetChampionByNameController";
import { GetChampionByNameValidator } from "./GetChampionByNameValidator";

const getChampionByNameUseCase = new GetChampionByNameUseCase(championRepository);
const getChampionByNameValidator = new GetChampionByNameValidator();
const getChampionByNameController = new GetChampionByNameController(
  getChampionByNameUseCase,
  getChampionByNameValidator
);

export { getChampionByNameUseCase, getChampionByNameController };
