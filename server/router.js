const router = require('express').Router();
const video = require('./video');
const binary = require('./binary');

router.route('/videos/:Id')
  .get((req, res) => {
    video.get(req, res);
  })
  .put((req, res) => {
    video.put(req, res);
  })
  .delete((req, res) => {
    video.delete(req, res);
  });

router.route('/videos')
  .post((req, res) => {
    video.post(req, res);
  });

router.route('/binaries/:Id')
  .get((req, res) => {
    binary.get(req, res);
  });

module.exports = router;
