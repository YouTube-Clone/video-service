const faker = require('faker');
const knex = require('../knex');

function adsGen(index) {
  const ads = [];
  const AdCategories = ['Comedic', 'Informative'];
  return new Promise((resolve, reject) => {
    for (let j = index * 1000; j < (1000 * index) + 1000; j += 1) {
      const videoId = 9000001 + j;
      const category = AdCategories[Math.floor(Math.random() * AdCategories.length)];
      const banner = faker.image.imageUrl();
      ads.push({
        videoId, category, banner,
      });
    }
    resolve(knex.transaction((trx) => {
      return knex.batchInsert('ads', ads, 500).transacting(trx)
        .then(res => res)
        .catch((err) => {
          if (err) throw err;
        });
    }));
  });
}

function channelsGen() {
  const channels = [];
  return new Promise((resolve, reject) => {
    for (let j = 0; j < 1000; j += 1) {
      const name = faker.internet.userName();
      const owner = Math.ceil((Math.random() * 999999) + 1);
      channels.push({ name, owner });
    }
    resolve(knex.transaction((trx) => {
      return knex.batchInsert('channels', channels, 500).transacting(trx)
        .then(res => res)
        .catch((err) => {
          if (err) throw err;
        });
    }));
  });
}

function getBatch(gener) {
  const all = [];
  for (let i = 0; i < 1000; i++) {
    all.push(gener(i));
  }
  return all;
}

Promise.all(getBatch(adsGen))
  .then(() => Promise.all(getBatch(channelsGen)))
  .then(() => {
    process.exit();
  });

// const all = [];
// const AdCategories = ['Comedic', 'Informative'];
// for (let j = 0; j < 1000; j += 1) {
//   const ads = [];
//   for (let i = (j * 1000) + 1; i < ((j + 1) * 1000) + 1; i += 1) {
//     const videoId = 9000000 + i;
//     const category = AdCategories[Math.floor(Math.random() * AdCategories.length)];
//     const banner = faker.image.imageUrl();
//     ads.push({
//       id: i, videoId, category, banner,
//     });
//   }
//   all.push(knex.batchInsert('ads', ads, 1000)
//     .catch((err) => {
//       if (err) throw err;
//     }));
// }

// for (let j = 0; j < 2000; j += 1) {
//   const channels = [];
//   for (let i = (j * 1000) + 1; i < ((j + 1) * 1000) + 1; i += 1) {
//     const name = faker.internet.userName();
//     const owner = Math.ceil((Math.random() * 999999) + 1);
//     channels.push({ id: i, name, owner });
//   }
//   all.push(knex.batchInsert('channels', channels, 1000));
// }

// Promise.all(all).then(() => {
//   process.exit();
// });
