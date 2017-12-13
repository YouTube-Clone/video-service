const faker = require('faker');
const knex = require('../knex');

const all = [];
for (let j = 0; j < 1000; j += 1) {
  const users = [];
  for (let i = (j * 1000) + 1; i < ((j + 1) * 1000) + 1; i += 1) {
    const name = faker.internet.userName();
    users.push({ id: i, name });
  }
  all.push(knex.batchInsert('users', users, 1000));
}
Promise.all(all).then(() => {
  process.exit();
});
