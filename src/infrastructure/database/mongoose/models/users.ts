import { IUser } from '@modules/user/domain/User';
import { randomUUID } from 'crypto';
import { DateTime } from 'luxon';
import { Schema, model } from 'mongoose';

export type UserSchemaType = {
  _id: string;
} & IUser;

const userSchema = new Schema<UserSchemaType>({
  _id: {
    type: String,
    default: () => randomUUID(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: () => DateTime.now().toUTC().toJSDate(),
  },
  updatedAt: {
    type: Date,
    default: () => DateTime.now().toUTC().toJSDate(),
  },
});

export const UserModel = model<UserSchemaType>('User', userSchema);
