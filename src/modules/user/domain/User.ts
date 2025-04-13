import { AggregateRoot } from "@core/domain/AggregateRoot";
import { UniqueEntityId } from "@core/domain/UniqueEntityId";
import { Guard } from "@core/logic/Guard";
import { Result } from "@core/logic/Result";


export interface IUser {
    name: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class User extends AggregateRoot<IUser> {

    get id(): UniqueEntityId {
        return this._id;
    }
    get name(): string {
        return this.props.name;
    }
    get email(): string {
        return this.props.email;
    }
    get isActive(): boolean {
        return this.props.isActive;
    }
    get createdAt(): Date {
        return this.props.createdAt;
    }
    get updatedAt(): Date {
        return this.props.updatedAt;
    }


    private constructor(props: IUser, id: UniqueEntityId | null) {
        super(props, id);
    }

    static create(props: IUser, id: UniqueEntityId | null): Result<User> {
        const guardedProps = [
            { argument: props.name, argumentName: "name" },
            { argument: props.email, argumentName: "email" },
            { argument: props.isActive, argumentName: "isActive" },
            { argument: props.createdAt, argumentName: "createdAt" },
            { argument: props.updatedAt, argumentName: "updatedAt" },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result.fail<User>(guardResult.message);
        }

        const user = new User({
            ...props,
        }, id);
        return Result.ok<User>(user);
    }
}