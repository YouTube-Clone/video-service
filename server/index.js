const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => {
  console.log('Contacts server listening on port %s.', PORT);
});
