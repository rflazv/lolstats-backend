"use strict"

import * as yup from 'yup';

import { IMetadataObject } from '@core/types/IMetadataObject';
import { AppError } from './AppError';

const BAD_REQUEST = 'BAD_REQUEST';

export class Validator {
  private shape: IMetadataObject;
  private toValidate: IMetadataObject;

  constructor(shape, toValidate) {
    this.shape = shape;
    this.toValidate = toValidate;
  }

  async validate() {
    try {
      const schema = yup.object().shape(this.shape);
      
      const validData = await schema.validate(this.toValidate);
  
      return validData;
    } catch (err) {
      const messageWithCustomError = typeof err.message !== 'string';
      const message = messageWithCustomError ? err.message?.message : err.message;
      const code = messageWithCustomError ? err.message?.code : BAD_REQUEST;

      throw new AppError(400, message, code);
    }
  }
}

