import mongoose from 'mongoose';
import Champion from '../modules/champions/champion.model'; 
import championsData from '../data/cleanedChampions.json'; 

const MONGODB_URI = 'mongodb://localhost:27017/lolstats'; 

async function importChampions() {
  try {
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
