const knex = require('../knex');
const faker = require('faker');

function videosGen() {
  return new Promise((resolve, reject) => {
    const categories = ['Auto & Vehicles', 'Beauty & Fashion', 'comedy', 'Education', 'Entertainment', 'Food', 'Gaming', 'How-to', 'Music', 'News & Politics', 'Pets & Animals', 'Science & Technology', 'Sports', 'Travel'];
    const videos = [];
    for (let i = 1; i < 1001; i += 1) {
      const title = faker.internet.userName();
      const category = categories[Math.floor(Math.random() * categories.length)];
      const length = Math.ceil(Math.random() * 7200000);
      const views = Math.floor(Math.random() * 10000000000);
      const url = `/assets/${Math.floor((Math.random() * 1200) + 1)}`;
      const creator = Math.ceil((Math.random() * 999999) + 1);
      const created_at = faker.date.past();
      videos.push({
        title, category, length, views, url, creator, created_at,
      });
    }
    resolve(knex.transaction((trx) => {
      return knex.batchInsert('videos', videos, 500).transacting(trx)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          if (err) throw err;
        });
    }));
  });
}

function getBatch() {
  const all = [];
  for (let i = 0; i < 2000; i++) {
    all.push(videosGen());
  }
  return all;
}

Promise.all(getBatch())
  .then(() => Promise.all(getBatch()))
  .then(() => Promise.all(getBatch()))
  .then(() => Promise.all(getBatch()))
  .then(() => Promise.all(getBatch()))
  .then(() => {
    process.exit();
  });
