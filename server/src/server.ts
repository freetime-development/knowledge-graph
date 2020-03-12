const bodyParser = require('body-parser')
const express = require('express')

import router from './routes/router'

const app = express();
const host = 'http://localhost';
const port = Number(process.env.npm_config_port) || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});
app.use("/", router);

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.info('==> Listening on port %s in %s mode. Open up %s:%s/ in your browser.', port, process.env.NODE_ENV, host, port);
});
