global.express = require('express');
global.app = express();
global.jwt = require('jsonwebtoken');
global.cors = require('cors');
global.mysql = require('mysql');
global.bcrypt = require('bcrypt');
global.connection = mysql.createPool({
  connectionLimit: 10, // default = 10
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "signature"
});

const routes = require('./routes');
const bodyParser = require('body-parser');
//const methodOverride = require("method-override");
const config = require('./configs/config');

app.use(cors());
app.set('key', config.key);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(methodOverride());
app.use('/', routes());

app.listen(4000, () => {
  console.log('Server up');
});