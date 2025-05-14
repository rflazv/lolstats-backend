import { championRepository } from "@modules/champions/repository";
import { GetAllChampionsUseCase } from "./GetAllChampionsUseCase";
import GetAllChampionsController from "./GetAllChampionsController"; 

const getAllChampionsUseCase = new GetAllChampionsUseCase(championRepository);
const getAllChampionsController = new GetAllChampionsController(getAllChampionsUseCase);  

export { getAllChampionsUseCase, getAllChampionsController };
