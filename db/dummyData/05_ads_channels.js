const faker = require('faker');
const knex = require('../knex');

const all = [];
const AdCategories = ['Comedic', 'Informative'];
for (let j = 0; j < 1000; j++) {
  const ads = [];
  for (let i = j * 1000 + 1; i < (j + 1) * 1000 + 1; i += 1) {
    const videoId = Math.ceil(Math.random() * 999999 + 1);
    const category = AdCategories[Math.floor(Math.random() * AdCategories.length)];
    const banner = faker.image.imageUrl();
    ads.push({
      id: i, videoId, category, banner,
    });
  }
  all.push(knex.batchInsert('ads', ads, 1000)
    .catch((err) => {
      if (err) throw err;
    }));
}

for (let j = 0; j < 2000; j += 1) {
  const channels = [];
  for (let i = (j * 1000) + 1; i < ((j + 1) * 1000) + 1; i += 1) {
    const name = faker.internet.userName();
    const owner = Math.ceil((Math.random() * 999999) + 1);
    channels.push({ id: i, name, owner });
  }
  all.push(knex.batchInsert('channels', channels, 1000));
}

Promise.all(all).then(() => {
  process.exit();
});
