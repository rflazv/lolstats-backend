import * as yup from 'yup';

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

export type FailedValidation<T> = Extract<ValidationResult<T>, { success: false }>;
export interface IValidator<T> {
  validate(data: unknown): Promise<ValidationResult<T>>;
}

export class YupAdapter<T> implements IValidator<T> {
  constructor(private readonly schema: yup.ObjectSchema<T>) {}

  async validate(data: unknown): Promise<ValidationResult<T>> {
    try {
      const validatedData = await this.schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      return { success: true, data: validatedData as T };
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = err.inner.reduce((acc: Record<string, string>, curr) => {
          if (curr.path) acc[curr.path] = curr.message;
          return acc;
        }, {});
        return { success: false, errors };
      }

      return {
        success: false,
        errors: { general: 'Erro desconhecido na validação' },
      };
    }
  }
}
