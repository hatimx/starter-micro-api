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
    return JSON.Parse(data)
}

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) { 
    res.status(200).send("Welcome to Cyclic Server...");
});

app.get('/students', function (req, res) { 
    let data = readData()
     res.status(200).send(data)
});

app.post('/addstudent', function (req, res) { 
     let student = req.body
     writeData(student)
    res.status(200).send("Student Added Successfully");
});

app.listen(port, function () {
    
});
