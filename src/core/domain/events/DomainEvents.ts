"use strict"

import debug from "debug";
import { getNamespace } from "cls-hooked";

import { AggregateRoot } from "@core/domain/AggregateRoot";
import { UniqueEntityId } from "@core/domain/UniqueEntityId";
import { IDomainEvent } from "./IDomainEvent";
import { APP_NAME } from "@config/index";


export class DomainEvents {
    private static handlersMap = {};
    private static markedAggregates: AggregateRoot<any>[] = [];

    private static log: debug.IDebugger = debug(`${APP_NAME}:DomainEvents`);

    private constructor() { }

    private static publish(event: IDomainEvent): void {
        const eventClassName: string = event.constructor.name;

        if (this.handlersMap.hasOwnProperty(eventClassName)) {
            const handlers: any[] = this.handlersMap[eventClassName];
            for (const handler of handlers) {
                handler(event);
            }
        }
    }


    private static findMarkedAggregateById(id: UniqueEntityId): AggregateRoot<any> {
        let found: AggregateRoot<any> = null;
        for (let aggregate of this.markedAggregates) {
            if (aggregate.id.equals(id)) {
                found = aggregate;
            }
        }

        return found;
    }


    private static removeAggregateFromMarkedPublishList(aggregate: AggregateRoot<any>): void {
        const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));

        this.markedAggregates.splice(index, 1);
    }


    private static publishAggregateEvents(aggregate: AggregateRoot<any>): void {
        aggregate.domainEvents.forEach((event: IDomainEvent) => this.publish(event));
    }


    /**
     * @method markAggregateForPublish
     * @desc Called by aggregate root objects that have created domain
     * events to eventually be dispatched when the infrastructure commits
     * the unit of work. 
    */
    public static markAggregateForPublish(aggregate: AggregateRoot<any>): void {
        this.log("[MarkAggregateForPublish]");
        const aggregateFound = !!this.findMarkedAggregateById(aggregate.id);

        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }

    public static dispatchEventsForAggregate(id: UniqueEntityId): void {
        this.log("[PublishEventsForAggregate] - AggregateId: ", id);
        const aggregate = this.findMarkedAggregateById(id);
        this.log("[PublishEventsForAggregate] - Aggregate found!");

        if (aggregate) {
            this.publishAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedPublishList(aggregate);
        }
    }


    public static register(
        callback: (event: IDomainEvent) => void,
        eventClassName: string,
    ): void {

        if (!this.handlersMap.hasOwnProperty(eventClassName)) {
            this.handlersMap[eventClassName] = [];
        }
        this.handlersMap[eventClassName].push(callback);

    }

    public static clearHandlers(): void {
        this.handlersMap = {};
    }

    public static clearMarkedAggregates(): void {
        this.markedAggregates = [];
    }

    public static create(): DomainEvents {
        const namespace = getNamespace(process.env.CLS_NAMESPACE);
        const key = "DomainEvents";

        let domainEvents: DomainEvents = namespace.get(key);
        if (domainEvents === undefined) {
            domainEvents = new DomainEvents();
            namespace.set(key, domainEvents);
        }

        return domainEvents;
    }

}