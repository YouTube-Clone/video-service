const knex = require('../knex');

const all = [];
for (let j = 0; j < 3500; j += 1) {
  const videosInChannel = [];
  for (let i = (j * 1000) + 1; i < ((j + 1) * 1000) + 1; i += 1) {
    const videoId = Math.ceil((Math.random() * 9999999) + 1);
    const channelId = Math.ceil((Math.random() * 1999999) + 1);
    videosInChannel.push({ videoId, channelId });
  }
  all.push(knex.transaction(trx =>
    trx.batchInsert('videos_in_channel', videosInChannel, 1000)
      .catch((err) => {
        if (err) throw err;
      })));
}

Promise.all(all).then(() => {
  process.exit();
});
