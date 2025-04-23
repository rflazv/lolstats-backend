import { UseCaseError } from "@core/domain/UseCaseError";
import { Result } from "@core/logic/Result";

export namespace CreateChampionErrors {
    export class ChampionAlreadyExists extends Result<UseCaseError> {
        constructor(name: string) {
            super(false, `Champion with name ${name} already exists`);
        }

        static create(name: string): ChampionAlreadyExists {
            return new ChampionAlreadyExists(name);
        }
    }

    export class InvalidChampionData extends Result<UseCaseError> {
        constructor(message: string) {
            super(false, message);
        }

        static create(message: string): InvalidChampionData {
            return new InvalidChampionData(message);
        }
    }

    export class ChampionCreationFailed extends Result<UseCaseError> {
        constructor() {
            super(false, "Failed to create champion");
        }

        static create(): ChampionCreationFailed {
            return new ChampionCreationFailed();
        }
    }

    export class RequiredName extends Result<UseCaseError> {
        constructor() {
            super(false, "Name is required");
        }

        static create(): RequiredName {
            return new RequiredName();
        }
    }

    export class RequiredTitle extends Result<UseCaseError> {
        constructor() {
            super(false, "Title is required");
        }

        static create(): RequiredTitle {
            return new RequiredTitle();
        }
    }

    export class RequiredTags extends Result<UseCaseError> {
        constructor() {
            super(false, "Tags are required");
        }

        static create(): RequiredTags {
            return new RequiredTags();
        }
    }

    export class RequiredStats extends Result<UseCaseError> {
        constructor() {
            super(false, "Stats are required");
        }
        static create(): RequiredStats {
            return new RequiredStats();
        }
    }

    export class RequiredHP extends Result<UseCaseError> {
        constructor() {
            super(false, "HP is required");
        }

        static create(): RequiredHP {
            return new RequiredHP();
        }
    }

    export class RequiredMP extends Result<UseCaseError> {
        constructor() {
            super(false, "MP is required");
        }

        static create(): RequiredMP {
            return new RequiredMP();
        }
    }

    export class RequiredAttackDamage extends Result<UseCaseError> {
        constructor() {
            super(false, "Attack Damage is required");
        }

        static create(): RequiredAttackDamage {
            return new RequiredAttackDamage();
        }
    }

    export class UnexpectedError extends Result<UseCaseError> {
        constructor() {
            super(false, "Unexpected error occurred");
        }

        static create(): UnexpectedError {
            return new UnexpectedError();
        }
    }
}