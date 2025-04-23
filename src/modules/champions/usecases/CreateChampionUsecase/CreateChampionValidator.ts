import * as yup from "yup";
import { ICreateChampionRequest } from "./models/requests/CreateChampionRequest";
import { FailedValidation, YupAdapter } from "adapters/YupAdapter";
import { CreateChampionErrors } from "./CreateChampionsErrors";
import { fail, success, Either } from "@core/logic/Result";


interface ICreateChampionValidatorBody {
    name: string;
    title: string;
    tags: string[];
    stats: {
        hp: number;
        attackDamage: number;
        mp: number;
        [key: string]: any;
    };
}

type ValidationResult = Either<
    | CreateChampionErrors.RequiredName
    | CreateChampionErrors.RequiredTitle
    | CreateChampionErrors.RequiredTags
    | CreateChampionErrors.RequiredStats
    | CreateChampionErrors.RequiredHP
    | CreateChampionErrors.RequiredMP
    | CreateChampionErrors.RequiredAttackDamage,
    ICreateChampionRequest
>;


export class CreateChampionValidator {
    private schema = yup.object({
        name: yup.string().required("O nome do campeão é obrigatório."),
        title: yup.string().required("O título do campeão é obrigatório."),
        tags: yup.array().of(yup.string()).min(1, "Pelo menos uma tag é obrigatória."),
        stats: yup.object({
            hp: yup.number().positive("O HP do campeão deve ser um número maior que zero."),
            mp: yup.number().positive("O MP do campeão deve ser um número maior que zero."),
            attackDamage: yup.number().positive("O ataque do campeão deve ser um número maior que zero.")
        }).required()
    });

    public async validate(championData: ICreateChampionValidatorBody): Promise<ValidationResult> {
        const validator = new YupAdapter(this.schema);
        const result = await validator.validate(championData);

        if (!result.success) {
            const { errors } = result as FailedValidation<ICreateChampionValidatorBody>

            if (errors.name === CreateChampionErrors.RequiredName.create().errorValue().message) {
                return fail(CreateChampionErrors.RequiredName.create());
            }

            if (errors.title === CreateChampionErrors.RequiredTitle.create().errorValue().message) {
                return fail(CreateChampionErrors.RequiredTitle.create());
            }

            if (errors.tags === CreateChampionErrors.RequiredTags.create().errorValue().message) {
                return fail(CreateChampionErrors.RequiredTags.create());
            }

            if (errors.stats === CreateChampionErrors.RequiredStats.create().errorValue().message) {
                return fail(CreateChampionErrors.RequiredStats.create());
            }

            if (errors.hp === CreateChampionErrors.RequiredHP.create().errorValue().message) {
                return fail(CreateChampionErrors.RequiredHP.create());
            }

            if (errors.mp === CreateChampionErrors.RequiredMP.create().errorValue().message) {
                return fail(CreateChampionErrors.RequiredMP.create());
            }

            if (errors.attackDamage === CreateChampionErrors.RequiredAttackDamage.create().errorValue().message) {
                return fail(CreateChampionErrors.RequiredAttackDamage.create());
            }

            return fail(CreateChampionErrors.UnexpectedError.create());
        }


        return success(result.data as ICreateChampionRequest);
    }
}