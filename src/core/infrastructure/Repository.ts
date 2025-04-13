export interface Repository<T> {
    save(u: T): Promise<void>;
    getById(id: string): Promise<T>;
    getAll(): Promise<T[]>;
    exists([prop]: string): Promise<boolean>;
}