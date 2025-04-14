import { Request, Response } from 'express';
import ChampionService from './champion.service';
import { ObjectId } from 'mongodb';  

class ChampionController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const champions = await ChampionService.getAllChampions();
            return res.json(champions);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    public async getById(req: Request, res: Response): Promise<Response> {
        try {
            
            if (!ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const champion = await ChampionService.getChampionById(req.params.id);
            if (!champion) {
                return res.status(404).json({ message: 'Campeão não encontrado' });
            }
            return res.json(champion);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    public async getByName(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.params;  
            console.log(`Buscando campeão com nome: ${name}`); 
            const champion = await ChampionService.getChampionByName(name);  
            if (!champion) {
                return res.status(404).json({ message: 'Campeão não encontrado.' });
            }
            return res.json(champion);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const champion = await ChampionService.createChampion(req.body);
            return res.status(201).json(champion);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new ChampionController();
