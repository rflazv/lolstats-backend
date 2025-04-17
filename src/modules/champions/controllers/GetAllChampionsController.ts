import { GetAllChampionsUseCase } from '@modules/champions'; 

class GetAllChampionsController {
    async handle(req, res) {
        try {
            const champions = await GetAllChampionsUseCase.execute(); 
            res.json(champions);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter campeões' });
        }
    }
}

export default new GetAllChampionsController();
