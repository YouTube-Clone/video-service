const router = require('express').Router();
const video = require('./video');


router.route('/video/:Id')
  .get((req, res) => {
    video.get(req, res);
  })
  .put((req, res) => {
    video.put(req, res);
  })
  .delete((req, res) => {
    video.delete(req, res);
  });

router.route('/video')
  .post((req, res) => {
    video.post(req, res);
  });

module.exports = router;
