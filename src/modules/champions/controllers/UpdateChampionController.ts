import { Request, Response } from 'express';
import UpdateChampionUseCase from '../usecases/UpdateChampionUseCase';

class UpdateChampionController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateChampion = await UpdateChampionUseCase.execute(id, req.body);

            if (!updateChampion) {
                return res.status(404).json({ error: 'Campeão não encontrado.' });
            }

            return res.status(200).json(updateChampion);
        }   catch (error) {
            console.error('Erro ao atualizar campeão:', error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}

export default new UpdateChampionController();