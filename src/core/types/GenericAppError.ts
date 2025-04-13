import { Result } from "@core/logic/Result";
import { UseCaseError } from "@core/domain/UseCaseError";

export namespace GenericAppError {

    export class UnexpectedError extends Result<UseCaseError> {
      private constructor(err: any) {
        super(false, {
          message: `An unexpected error occurred.`,
          error: err
        } as UseCaseError)
  
        console.log(`[AppError]: An unexpected error occurred`);
        console.error(err);
      }
  
      public static create(err: any): UnexpectedError {
        return new UnexpectedError(err);
      }
    }
  
    export class ResourceNotFound extends Result<UseCaseError> {
      constructor(resourceName: string) {
        super(false, {
          message: `The provided ${resourceName} resource not found`
        } as UseCaseError);
      }
  
      public static create(resourceName: string): ResourceNotFound {
        return new ResourceNotFound(resourceName);
      }
    }
  }