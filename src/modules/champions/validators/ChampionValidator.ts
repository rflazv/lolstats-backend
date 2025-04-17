import { ChampionErrors } from "../errors/ChampionErrors";
import ChampionRepository from "@modules/champions/repository/ChampionRepository";

interface ChampionData {
    name: string;
    title: string;
    tags: string[];
    stats: {
        hp: number;
        attackdamage: number;
        mp: number;
        [key: string]: any;
    };
}

class ChampionValidator {
    static async validate(championData: ChampionData) {
        const erros: string[] = [];

        if (!championData.name || championData.name.trim() === "") {
            erros.push("O nome do campeão é obrigatório.");
        } 
        
        const existingChampion = await ChampionRepository.findByName(championData.name);
        if (existingChampion) {
            erros.push("Já existe um campeão com esse nome.");
        }

        if (!championData.title || championData.title.trim() === "") {
            erros.push("O título do campeão é obrigatório.");
        }
        if (!Array.isArray(championData.tags) || championData.tags.length === 0) {
            erros.push("Pelo menos uma tag é obrigatória.");
        }
        if (typeof championData.stats.hp !== "number" || championData.stats.hp <= 0) {
            erros.push("O HP do campeão deve ser um número maior que zero.");
        }
        if (typeof championData.stats.mp !== "number" || championData.stats.mp <= 0) {
            erros.push("O MP do campeão deve ser um número maior que zero.");
        }
        if (typeof championData.stats.attackDamage !== "number" || championData.stats.attackDamage <= 0) {
            erros.push("O ataque do campeão deve ser um número maior que zero.");
        }

        return erros;
    }
}

export default ChampionValidator;
