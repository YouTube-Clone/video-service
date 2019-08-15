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
      const type = 'regular';
      const chance = Math.random();
      let views;
      if (chance < 0.5) {
        views = Math.floor((Math.random() * 200) + 1);
      } else if (chance >= 0.5 && chance < 0.95) {
        views = Math.floor((Math.random() * 999800) + 200);
      } else {
        views = Math.floor((Math.random() * 10000000) + 1000000);
      }
      const binary = type === 'regular' ? Math.floor((Math.random() * 3500) + 1) : Math.floor((Math.random() * 500) + 3501);
      const ad_binary = (views < 200 || type === 'ad') ? null : Math.floor((Math.random() * 500) + 3501);
      const creator = Math.ceil((Math.random() * 999999) + 1);
      const created_at = faker.date.past();
      videos.push({
        title, category, length, views, type, binary, ad_binary, creator, created_at,
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

function adVideoGen() {
  return new Promise((resolve, reject) => {
    const categories = ['Auto & Vehicles', 'Beauty & Fashion', 'comedy', 'Education', 'Entertainment', 'Food', 'Gaming', 'How-to', 'Music', 'News & Politics', 'Pets & Animals', 'Science & Technology', 'Sports', 'Travel'];
    const videos = [];
    for (let i = 1; i < 1001; i += 1) {
      const title = faker.internet.userName();
      const category = categories[Math.floor(Math.random() * categories.length)];
      const length = Math.ceil(Math.random() * 7200000);
      const type = 'ad';
      const chance = Math.random();
      let views;
      if (chance < 0.5) {
        views = Math.floor((Math.random() * 200) + 1);
      } else if (chance >= 0.5 && chance < 0.95) {
        views = Math.floor((Math.random() * 999800) + 200);
      } else {
        views = Math.floor((Math.random() * 10000000) + 1000000);
      }
      const binary = type === 'regular' ? Math.floor((Math.random() * 3500) + 1) : Math.floor((Math.random() * 500) + 3501);
      const ad_binary = (views < 200 || type === 'ad') ? null : Math.floor((Math.random() * 500) + 3501);
      const creator = Math.ceil((Math.random() * 999999) + 1);
      const created_at = faker.date.past();
      videos.push({
        title, category, length, views, type, binary, ad_binary, creator, created_at,
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

function getBatch(amount, fn) {
  const all = [];
  for (let i = 0; i < amount; i++) {
    all.push(fn());
  }
  return all;
}

Promise.all(getBatch(2000, videosGen))
  .then(() => Promise.all(getBatch(2000, videosGen)))
  .then(() => Promise.all(getBatch(2000, videosGen)))
  .then(() => Promise.all(getBatch(2000, videosGen)))
  .then(() => Promise.all(getBatch(1000, videosGen)))
  .then(() => Promise.all(getBatch(1000, adVideoGen)))
  .then(() => {
    process.exit();
  });
