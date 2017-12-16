
exports.up = (knex, Promise) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary().index();
    table.string('name');
  })
    .createTable('videos', (table) => {
      table.increments('id').primary().index();
      table.string('title');
      table.string('category');
      table.integer('length');
      table.bigInteger('views');
      table.string('type');
      table.integer('ad_binary');
      table.integer('binary');
      table.integer('creator').references('users.id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('ads', (table) => {
      table.increments('id').primary().index();
      table.integer('videoId').references('videos.id');
      table.string('category');
      table.string('banner');
    })
    .createTable('channels', (table) => {
      table.increments('id').primary().index();
      table.string('name');
      table.integer('owner').references('users.id');
    })
    .createTable('subscribers', (table) => {
      table.integer('userId').references('users.id');
      table.integer('channelId').references('channels.id');
    })
    .createTable('videos_in_channel', (table) => {
      table.integer('videoId');
      table.integer('channelId').references('channels.id');
    });

exports.down = (knex, Promise) =>
  knex.schema.dropTable('videos_in_channel')
    .dropTable('subscribers')
    .dropTable('channels')
    .dropTable('ads')
    .dropTable('videos')
    .dropTable('users');

