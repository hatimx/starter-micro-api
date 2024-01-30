const express = require('express');
const port = 3000;

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(port, function () {
    
});
