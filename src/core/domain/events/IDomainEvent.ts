import { DateTime } from "luxon";
import { UniqueEntityId } from "@core/domain/UniqueEntityId";

export interface IDomainEvent {
    dateTimeOccurred: DateTime;
    getAggregateId(): UniqueEntityId;
}