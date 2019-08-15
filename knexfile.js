const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db',
      user: 'jinxuanlin',
      password: '',
      database: 'youtube',
      pool: {
        min: 1,
        max: 75,
      },
    },
    migrations: {
      directory: path.join(__dirname, '/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds'),
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: 'db',
      user: 'jinxuanlin',
      password: '',
      database: 'youtube',
      pool: {
        min: 1,
        max: 75,
      },
    },
    migrations: {
      directory: path.join(__dirname, '/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds'),
    },
  },
};
