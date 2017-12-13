const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'jinxuanlin',
      password: '',
      database: 'youtube',
      pool: {
        min: 5,
        max: 200
      },
    },
    debug: true,
    migrations: {
      directory: path.join(__dirname, '/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds'),
    },
  },
};
