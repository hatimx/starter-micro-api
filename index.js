const express = require('express');
const AWS = require("aws-sdk");

const s3 = new AWS.S3()
const app = express();
const port = 3000;

////////////////////////////////////////////////////////////////////////////////

function writeData(data){
    s3.putObject({
            Body: JSON.stringify(data),
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "data/data.json",
        })
}

function readData(){
  let data = s3.getObject({
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "data/data.json",
        })
  return JSON.parse(data)
}

////////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
  res.status(200).send("Welcome to API on CYLIC Server");
});



app.listen(port, function () {});
