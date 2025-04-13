import { User } from "../domain/User";

export interface IUserRepository {
    create(name: string, email: string): Promise<void>;
    getUserByEmail(email: string): Promise<User | null>;
    getUserById(id: string): Promise<User | null>;
    update(id: string, name: string, email: string): Promise<void>;
    delete(id: string): Promise<void>;
}