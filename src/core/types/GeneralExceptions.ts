
export enum GeneralExceptions {
    INVALID_AUTH_TOKEN = "Invalid auth token",
    MISSING_CONTENT_TYPE = "Missing content type",
    MISSING_FILE_NAME = "Missing filename",
    INVALID_IDENTIFIER = "Identificador inválido",
    UNAUTHORIZED = "Unauthorized",
    UNABLE_TO_AUTHENTICATE_USER = "Unable to authenticate user. Please contact the administrator",
    UNABLE_TO_ACCESS_STORAGE_FILE = "Unable to access storage file.",
    SOMETHING_WENT_WRONG = "Something went wrong, please contact the administrator.",
    INVALID_OPEARATION = "Operação inválida",
}

export type GeneralExceptionsKey = keyof typeof GeneralExceptions;

export const GENERAL_EXCEPTIONS_KEYS = new Map<
    GeneralExceptions,
    GeneralExceptionsKey
>(
    Object.entries(
        GeneralExceptions
    ).map(([key, val]: [GeneralExceptionsKey, GeneralExceptions]) => [val, key])
);
