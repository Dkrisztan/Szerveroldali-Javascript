const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('static'));

require('./route/index')(app);

app.use((err, req, res, next) => {
  res.end('Error . . .');
  console.log(err);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

//TODO az orszag torlese nem torli a hozza tartozo latnivalokat