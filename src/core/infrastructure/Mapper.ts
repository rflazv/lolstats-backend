
/**
 * @abstract Mapper<T>
 * @desc Mapper generic class for parsing values from application to domain entities,
 * or domain entities to persistence layer and vice versa. 
 * Generic type T would be a DomainEntity or a ValueObject type.
*/
export abstract class Mapper<T> {
    abstract toDomain(raw: T, id: string | null): T;
    abstract toPersistence(t: T): any;
}