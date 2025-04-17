import Champion from "@infrastructure/database/mongoose/models/Champion";

class ChampionRepository {
    async findAll() {
        return Champion.find();
    }

    async findById(id: string) {
        return Champion.findById(id);
    }

    async create(data: any) {
        const champion = new Champion(data);
        return champion.save();
    }

    async findByName(name: string) {
        return await Champion.findOne({ name: new RegExp(name, 'i') });
    }

    async update(id: string, data: any) {
        return Champion.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return Champion.findByIdAndDelete(id);
    }
}

export default new ChampionRepository();