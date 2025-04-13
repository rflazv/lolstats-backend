import { randomUUID } from 'crypto';
import { DateTime } from 'luxon';
import mongoose, { Model, Document } from 'mongoose';

const usersSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => randomUUID()
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
        default: () => true
    },
    createdAt: {
        type: Date,
        default: () => DateTime.now().toUTC().toJSDate()
    },
    updatedAt: {
        type: Date,
        default: () => DateTime.now().toUTC().toJSDate()
    },
});

export const users =
    mongoose.models.users ||
    mongoose.model<Model<Document>>("users", usersSchema, "users");
