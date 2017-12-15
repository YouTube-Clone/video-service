const knex = require('../knex');

// const all = [];
// for (let j = 0; j < 3500; j += 1) {
//   const subscribers = [];
//   for (let i = (j * 1000) + 1; i < ((j + 1) * 1000) + 1; i += 1) {
//     const userId = Math.ceil((Math.random() * 999999) + 1);
//     const channelId = Math.ceil((Math.random() * 999999) + 1);
//     subscribers.push({ userId, channelId });
//   }
//   all.push(knex.batchInsert('subscribers', subscribers, 1000));
// }

// Promise.all(all).then(() => {
//   process.exit();
// });

function subscribersGen() {
  return new Promise((resolve, reject) => {
    const subscribers = [];
    for (let i = 1; i < 1001; i += 1) {
      const userId = Math.ceil((Math.random() * 999999) + 1);
      const channelId = Math.ceil((Math.random() * 999999) + 1);
      subscribers.push({ userId, channelId });
    }
    resolve(knex.transaction((trx) => {
      return knex.batchInsert('subscribers', subscribers, 500).transacting(trx)
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
    all.push(subscribersGen());
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
