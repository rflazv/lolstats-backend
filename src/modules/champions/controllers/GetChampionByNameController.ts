import { Request, Response } from 'express';
import GetChampionByNameUseCase from '../usecases/GetChampionByNameUseCase';

class GetChampionByNameController {
  async handle(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const champion = await GetChampionByNameUseCase.execute(name);  
      if (!champion) {
        return res.status(404).json({ error: 'Campeão não encontrado.' });
      }
      return res.status(200).json(champion);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new GetChampionByNameController();
