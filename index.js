const express = require('express');
const AWS = require("aws-sdk");

const s3 = new AWS.S3()
const app = express();
const port = 3000;

////////////////////////////////////////////////////////////////////////////////

function writeData(data){
    await s3.putObject({
            Body: JSON.stringify(data),
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "data/data.json",
        }).promise()
}

function readData(){
  let data = await s3.getObject({
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "data/data.json",
        }).promise()
  return JSON.parse(data)
}

////////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
  res.status(200).send("Welcome to API on CYLIC Server");
});



app.listen(port, function () {});
