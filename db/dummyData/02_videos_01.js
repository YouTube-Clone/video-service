const knex = require('../knex');
const faker = require('faker');

const all = [];
const categories = ['Auto & Vehicles', 'Beauty & Fashion', 'comedy', 'Education', 'Entertainment', 'Food', 'Gaming', 'How-to', 'Music', 'News & Politics', 'Pets & Animals', 'Science & Technology', 'Sports', 'Travel'];
for (let j = 0; j < 3500; j += 1) {
  const videos = [];
  for (let i = (j * 1000) + 1; i < ((j + 1) * 1000) + 1; i += 1) {
    const title = faker.internet.userName();
    const category = categories[Math.floor(Math.random() * categories.length)];
    const length = Math.ceil(Math.random() * 7200000);
    const views = Math.floor(Math.random() * 10000000000);
    const creator = Math.ceil((Math.random() * 999999) + 1);
    const created_at = faker.date.past();
    videos.push({
      id: i, title, category, length, views, creator, created_at,
    });
  }
  all.push(knex.batchInsert('videos', videos, 1000));
}
Promise.all(all).then(() => {
  process.exit();
});
