const knex = require('../knex');

const all = [];
for (let j = 3500; j < 7000; j += 1) {
  const subscribers = [];
  for (let i = (j * 1000) + 1; i < ((j + 1) * 1000) + 1; i += 1) {
    const userId = Math.ceil((Math.random() * 999999) + 1);
    const channelId = Math.ceil((Math.random() * 999999) + 1);
    subscribers.push({ userId, channelId });
  }
  all.push(knex.batchInsert('subscribers', subscribers, 1000));
}

Promise.all(all).then(() => {
  process.exit();
});
