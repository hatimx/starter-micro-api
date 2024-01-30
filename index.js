const express = require('express');
const port = 3000;

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) { 
    res.status(200).send("Welcome to Cyclic Server...");
});

app.listen(port, function () {
    
});
