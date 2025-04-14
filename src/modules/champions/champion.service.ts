import Champion from './champion.model'; 

class ChampionService {
    public async getAllChampions() {
        try {
            return await Champion.find(); 
        } catch (error) {
            throw new Error(`Erro ao buscar campeões: ${error.message}`);
        }
    }

    public async getChampionById(id: string) {
        try {
            const champion = await Champion.findById(id);  
            if (!champion) {
                throw new Error(`Campeão com ID ${id} não encontrado.`);
            }
            return champion;
        } catch (error) {
            throw new Error(`Erro ao buscar campeão com ID ${id}: ${error.message}`);
        }
    }

    public async getChampionByName(name: string) {
        try {
            const champion = await Champion.findOne({ name: { $regex: new RegExp(name, 'i') } });  
            if (!champion) {
                throw new Error(`Campeão com nome ${name} não encontrado.`);
            }
            return champion;
        } catch (error) {
            throw new Error(`Erro ao buscar campeão com nome ${name}: ${error.message}`);
        }
    }

    public async createChampion(data: any) {
        try {
            if (!data.name || !data.id) {
                throw new Error('Nome e ID são obrigatórios para criar um campeão.');
            }

            const champion = new Champion(data);  
            return await champion.save();  
        } catch (error) {
            throw new Error(`Erro ao criar campeão: ${error.message}`);
        }
    }
}

export default new ChampionService();  
