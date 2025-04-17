import { Request, Response } from 'express';
import CreateChampionUseCase from '../usecases/CreateChampionUseCase';

class CreateChampionController {
  public handle = async (req: Request, res: Response) => {
    try {
      const championData = req.body;
      const champion = await CreateChampionUseCase.execute(championData);
      return res.status(201).json(champion);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}

export default new CreateChampionController();
