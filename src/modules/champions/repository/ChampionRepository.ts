import Champion from "@infrastructure/database/mongoose/models/Champion";
import { IChampionRepository } from "./IChampionRepository";

export class ChampionRepository implements IChampionRepository {
    async findAll() {
        return Champion.find(); // sem filtros
    }

    async findById(id: string) {
        return Champion.findById(id);
    }

    async create(data: any) {
        const champion = new Champion(data);
        return champion.save();
    }

    async findByName(name: string) {
        return Champion.findOne({ name: new RegExp(name, 'i') });
    }

    async update(id: string, data: any) {
        return Champion.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return Champion.findByIdAndDelete(id);
    }
}
