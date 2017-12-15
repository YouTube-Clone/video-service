const faker = require('faker');
const knex = require('../knex');

function userGen() {
  const users = [];
  return new Promise((resolve, reject) => {
    for (let j = 0; j < 1000; j += 1) {
      const name = faker.internet.userName();
      users.push({ name });
    }
    resolve(knex.transaction((trx) => {
      return knex.batchInsert('users', users, 500).transacting(trx)
        .then(res => res)
        .catch((err) => {
          if (err) throw err;
        });
    }));
  });
}

function getBatch() {
  const all = [];
  for (let i = 0; i < 1000; i += 1) {
    all.push(userGen());
  }
  return all;
}

Promise.all(getBatch()).then(() => {
  process.exit();
});
