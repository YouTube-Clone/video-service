const knex = require('../db/knex');

module.exports = {
  get: (req, res) => {
    knex('videos').where('id', req.params.Id).then((video) => {
      res.json(video);
    }).catch((err) => {
      if (err) {
        console.log('video not found with given id', err);
        res.status(404).end();
      }
    });
  },
  put: (req, res) => {
    knex('videos').where('id', req.params.Id).update(req.body)
      .then(() => {
        res.status(200).json('successful');
      })
      .catch((err) => {
        if (err) { throw err; }
        res.status(404).json('not found videoid');
      });
  },
  delete: (req, res) => {
    knex('videos').where('id', req.params.Id).del()
      .then(() => {
        res.status(200).json('deleted successfully');
      })
      .catch((err) => {
        if (err) { throw err; }
        res.status(404).json('not found videoid');
      });
  },
  post: (req, res) => {
    knex.insert(req.body).into('videos').then(() => {
      res.status(200).json('Created new video successfully');
    })
      .catch((err) => {
        if (err) {
          throw err;
        }
        res.status(404).json('Failed to delete');
      })
  }
};
