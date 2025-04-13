"use strict"

import { randomUUID } from "crypto";

class Identifier<T> {
    constructor(private value: T) {
        this.value = value;
    }

    equals(id?: Identifier<T>): boolean {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.toValue() === this.value;
    }

    toString() {
        return String(this.value);
    }

    toValue(): T {
        return this.value;
    }
}

export class UniqueEntityId extends Identifier<string | number> {
    constructor(id?: string | number) {
        super(!!id ? id : randomUUID())
    }
}

