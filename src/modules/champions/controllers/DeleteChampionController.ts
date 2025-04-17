import { Request, Response } from 'express';
import DeleteChampionUseCase from '../usecases/DeleteChampionUseCase';

class DeleteChampionController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedChampion = await DeleteChampionUseCase.execute(id);

            if (!deletedChampion) {
                return res.status(404).json({ error: 'Campeão não encontrado.'});
            }

            return res.status(200).json({ message: 'Campeão deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar o campeão:', error);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}

export default new DeleteChampionController();