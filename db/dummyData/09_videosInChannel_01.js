const knex = require('../knex');

function videosInChannelGen() {
  return new Promise((resolve, reject) => {
    const videosInChannel = [];
    for (let i = 1; i < 1001; i += 1) {
      const videoId = Math.ceil((Math.random() * 9999999) + 1);
      const channelId = Math.ceil((Math.random() * 999999) + 1);
      videosInChannel.push({ videoId, channelId });
    }
    resolve(knex.transaction((trx) => {
      return knex.batchInsert('videos_in_channel', videosInChannel, 500).transacting(trx)
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
    all.push(videosInChannelGen());
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
