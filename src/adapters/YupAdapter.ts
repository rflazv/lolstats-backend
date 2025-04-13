import { IValidator } from '@core/logic/IValidator';
import * as yup from 'yup';

export class YupAdapter<T> implements IValidator<T> {
  constructor(private readonly schema: yup.ObjectSchema<T>) {}

  async validate<T>(data: unknown): Promise<T> {
    try {
      return await this.schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      }) as T;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const formattedErrors = err.inner.reduce((acc: Record<string, string>, curr) => {
          if (curr.path) acc[curr.path] = curr.message;
          return acc;
        }, {});
        throw new ValidationException(formattedErrors);
      }

      throw err;
    }
  }
}

export class ValidationException extends Error {
  public readonly errors: Record<string, string>;

  constructor(errors: Record<string, string>) {
    super('Validation failed');
    this.name = 'ValidationException';
    this.errors = errors;
  }
}
