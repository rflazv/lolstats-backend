import mongoose from 'mongoose';
import Champion from '../infrastructure/database/mongoose/models/Champion';  
import championsData from '../data/cleanedChampions.json';  
import dotenv from 'dotenv'; 

dotenv.config(); 

const MONGODB_URI = process.env.MONGO_URI; 

async function importChampions() {
  try {
    if (!MONGODB_URI) {
      throw new Error("A URL do MongoDB não foi configurada.");
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('🟢 Conectado ao MongoDB com sucesso.');

    await Champion.deleteMany({}); 
    console.log('🧹 Campeões antigos removidos do banco de dados.');

    await Champion.insertMany(championsData.champions);
    console.log('✅ Campeões limpos importados com sucesso!');

    process.exit(0); 
  } catch (error) {
    console.error('❌ Erro ao importar os campeões:', error);
    process.exit(1); 
  }
}

importChampions();
