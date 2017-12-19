const fs = require('fs');

module.exports = {
  get: (req, res) => {
    console.log('its here ', __dirname + `/../${req.params.Id}.mp4`);
    res.writeHead(200, { ContenType: 'video/mp4' });
    fs.createReadStream(__dirname + `/../assets/${req.params.Id}.mp4`).pipe(res);
  },
};
