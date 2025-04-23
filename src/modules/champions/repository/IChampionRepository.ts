export interface IChampionRepository {
    findAll(): Promise<any[]>;
    findById(id: string): Promise<any | null>;
    create(data: any): Promise<any>;
    findByName(name: string): Promise<any | null>;
    update(id: string, data: any): Promise<any | null>;
    delete(id: string): Promise<any | null>;
}
