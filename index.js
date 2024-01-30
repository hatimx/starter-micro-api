const express = require('express');
const port = 3000;

const AWS = require("aws-sdk");
const s3 = new AWS.S3()

function writeData(data) {
     s3.putObject({
            Body: JSON.stringify(data),
            Bucket: "cyclic-cute-robe-tick-eu-west-2",
            Key: "data/data.json",
        })
}

function readData() {
    let data =  s3.getObject({
            Bucket: "cyclic-cute-robe-tick-eu-west-2",
            Key: "data/data.json",
        })
    return data
}

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) { 
    res.status(200).send("Welcome to Cyclic Server...");
});

app.listen(port, function () {
    
});
