import mongoose from 'mongoose';

const ChampionSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    title: { type: String, required: false },
    tags: { type: [String], required: false },
    stats: {
        type: Object,
        required: false
    },
    image: { type: String, required: false } 
}, {
    timestamps: true
});

export default mongoose.model('Champion', ChampionSchema);
