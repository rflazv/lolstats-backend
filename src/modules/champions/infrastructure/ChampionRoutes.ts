import { Router } from 'express';
import GetAllChampionsController from '../usecases/GetAllChampionsUseCase/GetAllChampionsController';
import GetChampionByIdController from '../usecases/GetChampionsByIdUsecase/GetChampionsByIdController';
import GetChampionByNameController from '../usecases/GetChampionByNameUseCase/GetChampionByNameController';
import CreateChampionController from '../usecases/CreateChampionUsecase/CreateChampionController';
import UpdateChampionController from '../controllers/UpdateChampionController';
import DeleteChampionController from '../controllers/DeleteChampionController';
import { createChampionController } from '../usecases/CreateChampionUsecase';

export class ChampionRoutes {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public configureRoutes() {
    this.router.get('/champions', GetAllChampionsController.handle);
    this.router.get('/champions/:id', async (req, res, next) => {
      try {
        await GetChampionByIdController.handle(req, res);
      } catch (error) {
        next(error);
      }
    });
    this.router.get('/champions/name/:name', async (req, res, next) => {
      try {
        await GetChampionByNameController.handle(req, res);
      } catch (error) {
        next(error);
      }
    });
    this.router.post('/champions', createChampionController.execute.bind(createChampionController));
    this.router.put('/champions/:id', async (req, res, next) => {
      try {
        await UpdateChampionController.handle(req, res);
      } catch (error) {
        next(error);
      }
    })
    this.router.delete('/champions/:id', async (req, res, next) => {
      try {
        await DeleteChampionController.handle(req, res);
      } catch (error) {
        next(error);
      }
    });
  }
}
