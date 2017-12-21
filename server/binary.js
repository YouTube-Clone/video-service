const fs = require('fs');
const path = require('path');

module.exports = {
  get: (req, res) => {
    console.log('its here ', path.join(__dirname, `/../${req.params.Id}.mp4`));
    res.writeHead(200, { ContenType: 'video/mp4' });
    fs.createReadStream(path.join(__dirname, `/../${req.params.Id}.mp4`)).pipe(res);
  },
};
