import fs from 'fs';
import path from 'path';

interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

interface RawChampion {
  id: string;
  name: string;
  title: string;
  tags: string[];
  stats: ChampionStats;
}

interface CleanChampion {
  id: string;
  name: string;
  title: string;
  tags: string[];
  stats: ChampionStats;
}

const championsFilePath = path.join(__dirname, 'newChampions.json');
const cleanedChampionsFilePath = path.join(__dirname, 'cleanedChampions.json');

const cleanChampionData = (champion: RawChampion): CleanChampion => ({
  id: champion.id,
  name: champion.name,
  title: champion.title,
  tags: champion.tags,
  stats: {
    hp: champion.stats.hp,
    hpperlevel: champion.stats.hpperlevel,
    mp: champion.stats.mp,
    mpperlevel: champion.stats.mpperlevel,
    movespeed: champion.stats.movespeed,
    armor: champion.stats.armor,
    armorperlevel: champion.stats.armorperlevel,
    spellblock: champion.stats.spellblock,
    spellblockperlevel: champion.stats.spellblockperlevel,
    attackrange: champion.stats.attackrange,
    hpregen: champion.stats.hpregen,
    hpregenperlevel: champion.stats.hpregenperlevel,
    mpregen: champion.stats.mpregen,
    mpregenperlevel: champion.stats.mpregenperlevel,
    crit: champion.stats.crit,
    critperlevel: champion.stats.critperlevel,
    attackdamage: champion.stats.attackdamage,
    attackdamageperlevel: champion.stats.attackdamageperlevel,
    attackspeedperlevel: champion.stats.attackspeedperlevel,
    attackspeed: champion.stats.attackspeed
  }
});

fs.readFile(championsFilePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('❌ Erro ao ler o arquivo champions.json:', err);
    return;
  }

  const championsRaw = JSON.parse(data).data as Record<string, RawChampion>;
  const cleanedChampions = Object.values(championsRaw).map(cleanChampionData);

  const cleanedData = { champions: cleanedChampions };

  fs.writeFile(cleanedChampionsFilePath, JSON.stringify(cleanedData, null, 2), (err) => {
    if (err) {
      console.error('❌ Erro ao escrever o arquivo cleanedChampions.json:', err);
    } else {
      console.log('✅ champions.json limpo e salvo como cleanedChampions.json');
    }
  });
});
