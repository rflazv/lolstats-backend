import { championRepository } from "@modules/champions/repository";
import { DeleteChampionUseCase } from "./DeleteChampionUseCase";
import { DeleteChampionController } from "./DeleteChampionController";
import { DeleteChampionValidator } from "./DeleteChampionValidator";

const deleteChampionUseCase = new DeleteChampionUseCase(championRepository);
const deleteChampionValidator = new DeleteChampionValidator();
const deleteChampionController = new DeleteChampionController(
  deleteChampionUseCase,
  deleteChampionValidator
);

export { deleteChampionUseCase, deleteChampionController };
