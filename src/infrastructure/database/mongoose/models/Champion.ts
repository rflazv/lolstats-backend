import mongoose, { Document, Schema } from 'mongoose';

export interface IChampion extends Document {
    id: string;
    name: string;
    title: string;
    tags?: string[];
    stats?: Record<string, any>; 
    image?: string;
}

const ChampionSchema: Schema<IChampion> = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        title: { type: String, required: true },
        tags: { type: [String], required: false },
        stats: { type: Schema.Types.Mixed, required: false }, 
    },
    {
        timestamps: true, 
    }
);

export default mongoose.model<IChampion>('Champion', ChampionSchema, 'champions');
