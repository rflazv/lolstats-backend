import { Mapper } from "@core/infrastructure/Mapper";
import { IUser, User } from "../domain/User";
import { UniqueEntityId } from "@core/domain/UniqueEntityId";
import { UserSchemaType } from "@infrastructure/database/mongoose";




export class UserMappers implements Mapper<User> {
    public toDomain(raw: IUser, id: string | null): User {
        return User.create(
            {
                name: raw.name,
                email: raw.email,
                isActive: raw.isActive,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            }, new UniqueEntityId(id)
        ).getValue();
    }

    public toPersistence(user: User): UserSchemaType {
        return {
            _id: user.id.toString(),
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}