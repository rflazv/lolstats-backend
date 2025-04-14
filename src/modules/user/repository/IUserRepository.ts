import { UserSchemaType } from "@infrastructure/database/mongoose";
import { User } from "../domain/User";

export interface IUserRepository {
    create(user: UserSchemaType): Promise<void>;
    getUserByEmail(email: string): Promise<User | null>;
    getUserById(id: string): Promise<User | null>;
    update(id: string, user: User): Promise<void>;
    delete(id: string): Promise<void>;
}