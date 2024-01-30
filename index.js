const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(bodyParser.json()); 


app.get('/', function (req, res) {
  res.status(200).send("Welcome to API on CYLIC Server");
});





app.listen(port, function () {});
