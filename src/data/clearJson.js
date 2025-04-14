const fs = require('fs');
const path = require('path');

const championsFilePath = path.join(__dirname, 'champions.json');

const cleanedChampionsFilePath = path.join(__dirname, 'cleanedChampions.json');

const cleanChampionData = (champion) => {
  return {
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
  };
};

fs.readFile(championsFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Erro ao ler o arquivo champions.json:', err);
    return;
  }

  const champions = JSON.parse(data).data;

  const cleanedChampions = Object.values(champions).map(cleanChampionData);

  const cleanedData = { champions: cleanedChampions };

  fs.writeFile(cleanedChampionsFilePath, JSON.stringify(cleanedData, null, 2), (err) => {
    if (err) {
      console.error('❌ Erro ao escrever o arquivo cleanedChampions.json:', err);
    } else {
      console.log('✅ champions.json limpo e salvo como cleanedChampions.json');
    }
  });
});
