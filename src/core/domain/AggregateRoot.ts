"use strict"

import debug from "debug";

import { Entity } from "./Entity";
import { UniqueEntityId } from "./UniqueEntityId";
import { IDomainEvent } from "./events/IDomainEvent";
import { DomainEvents } from "./events/DomainEvents";


export abstract class AggregateRoot<T> extends Entity<T> {

    private _domainEvents: IDomainEvent[] = [];

    private log: debug.IDebugger;

    constructor(props: T, id?: UniqueEntityId) {
        super(props, id);
        this.log = debug(`${process.env.APP_NAME}:AggregateRoot<T>`);
    }

    get id(): UniqueEntityId {
        return this._id;
    }

    get domainEvents(): IDomainEvent[] {
        return this._domainEvents;
    }

    protected logDomainEventAdded(domainEventName: string): void {
        this.log(`[Domain event ${domainEventName} added]`);
    }

    protected addDomainEvent(domainEvent: IDomainEvent): void {
        console.log("[AddDomainEvent] - ", domainEvent.getAggregateId());
        this._domainEvents.push(domainEvent);

        // const domainEventsPublisher: DomainEvents = DomainEvents.create();
        DomainEvents.markAggregateForPublish(this);
    }

    public clearEvents(): void {
        this._domainEvents.splice(0, this._domainEvents.length);
    }

}