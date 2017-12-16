const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const apm = require('elastic-apm-node').start({
  appName: 'video',
  serverUrl: 'http://localhost:8200',
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(apm.middleware.express());

app.listen(PORT, () => {
  console.log('Contacts server listening on port %s.', PORT);
});
