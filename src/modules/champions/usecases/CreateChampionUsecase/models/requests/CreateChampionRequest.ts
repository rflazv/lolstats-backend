export interface ICreateChampionRequest {
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