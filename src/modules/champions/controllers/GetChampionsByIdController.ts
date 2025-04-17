import { Request, Response } from 'express';
import GetChampionByIdUseCase from '../usecases/GetChampionByIdUseCase';

class GetChampionByIdController {
  public handle = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const champion = await GetChampionByIdUseCase.execute(id);
      if (!champion) return res.status(404).json({ error: 'Campeão não encontrado.' });
      return res.status(200).json(champion);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}

export default new GetChampionByIdController();
