import { ValueObject } from "./ValueObject";
import { IdentificationType } from "@core/types/IdentificationType";
import { Guard } from "@core/logic/Guard";
import { Result } from "@core/logic/Result";


interface IDocumentIdProps {
    value: string;
    type: IdentificationType;
}

export class DocumentId extends ValueObject<IDocumentIdProps> {

    get value(): string {
        return this.props.value;
    }

    get type(): IdentificationType {
        return this.props.type;
    }

    get isCNPJ(): boolean {
        return this.props.value.length === 14;
    }

    get isCPF(): boolean {
        return this.props.value.length === 11;
    }

    private constructor(props: IDocumentIdProps) {
        super(props);
    }

    private static sanitizeDocumentId(id: string): string {
        return id.replace(/\./g, "").replace(/\//g, "").replace(/\-/g, "");
    }


    public static create(documentId: string): Result<DocumentId> {
        const guardResultAgainstNullOrUndefined = Guard.againstNullOrUndefined(documentId, 'documentId');
        if (!guardResultAgainstNullOrUndefined.succeeded) {
            return Result.fail<DocumentId>(guardResultAgainstNullOrUndefined.message);
        } 

        documentId = this.sanitizeDocumentId(documentId);

        const validDocumentIdLength: number[] = [11, 14];
        const guardResultAgainstValidDocumentIdLength = Guard.isOneOf(documentId.length, validDocumentIdLength, "documentId");
        if (!guardResultAgainstValidDocumentIdLength.succeeded) {
            return Result.fail<DocumentId>(guardResultAgainstValidDocumentIdLength.message);
        }

        
        else {
            return Result.ok<DocumentId>(new DocumentId({ 
                value: documentId, 
                type: (documentId.length === 11) ? IdentificationType.CPF : IdentificationType.CNPJ
            }));
        }   
    }

}