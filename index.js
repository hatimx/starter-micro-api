const express = require('express')
const bodyParser = require('body-parser')
const AWS = require("aws-sdk")
//const CircularJSON = require('circular-json')
//const CyclicDb = require("@cyclic.sh/dynamodb")
//const db = CyclicDb("clean-red-school-uniformCyclicDB")
//const students = db.collection("students")

AWS.config.update({
    accessKeyId: 'ASIAUPH2OSAEPQIH5RKS',
    secretAccessKey: 'lLnbmNgOrv2a37Eo7VOKI3iArynsObctpJatAFhP',
    sessionToken: 'IQoJb3JpZ2luX2VjEPb//////////wEaCXVzLWVhc3QtMiJGMEQCICCxs1/JSHVwd8vhfanmUsyul6D+KShUAH7dIZ1A78tyAiAsaxi8v5j791GdE9V8YT6Qc99/qmV/FZpsWmlRGnfGmCq7AgjA//////////8BEAAaDDMwNzYxNTQwNDA0MCIMQpSw+FuvB/3p7sq8Ko8C/MkNIpcX9X+pywIATkzOkdJkeTbFPov2B0JvhtC9hLgHnM7LliCtEGDRjtun+O3xE7ONDbap7F4y6adli83yeQ2T3Ozep9XvlCWY2DM4LFjAgO82qLdACCzzlRKinbDrr0MFWcElqGCo2sGh7lwBGITP8V5RUoVWuvNM//6AfkZGkfRMl28brVYYxauBWj3jXa3M1brTW9Er2qOZZwWILXT3qc5GhQixRusVSrVABTfSqRmxlcLfdMxn4q5ZfaHch5swHD0Lb2Rc3E2J38IvRUCPkCwn7vGE3LXLDvuVLRZw1y+GdQ5wyNR0CViSBLbbIUbaiLqNqI/7cicIDlWsOUo59YA1ulpCVKCgGcVlQjDChYmuBjqeAT8NO35WChJBynF81E+WVbmf3AFWHLIxDM68VXFOA2LhcxFjV8ksWem/J8PhMbBVBdjO442msqEuSKoSjjngC4KmRfj5Gkb2FINfblPWMX4i/Y+KkMJ7nnUwpfSxb1YqosdmnBP8puO1jn73TnAL1EF9bUXO48Wb05QcBbWulmYow1M3QSv1PwQsTcbVrcu4BeKLs9QKPU1Ynlw0V01D',
    region: 'eu-west-2'
});

const s3 = new AWS.S3()
const app = express()
app.use(bodyParser.json())
const port = 3000

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
  return data
}

////////////////////////////////////////////////////////////////////////////////

async function writeData2(data){
   await s3.putObject({
            Body: JSON.stringify(data),
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "data/data.json",
        }).promise()
}

async function readData2(){
        let data = await s3.getObject({
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "data/data.json",
        }).promise()
    return data
}

////////////////////////////////////////////////////////////////////////////////

async function write_data_db(data){
    let st = await students.set("id2", {
    name: "ahmed",
    age: "12"
    })
}

async function read_data_db(){
    let data = await students.get()
    return data
}

////////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
  res.status(200).send("Welcome to API on CYLIC Server")
})

////////////////////////////////////////////////////////////////////////////////

app.get('/students', function (req, res) {
    let data = readData2()
    res.status(200).send(data)
})

////////////////////////////////////////////////////////////////////////////////

app.post('/addstudent', function (req, res) {
    let student = req.body
    writeData2(student)
    res.status(200).send(student)
})

////////////////////////////////////////////////////////////////////////////////

app.listen(port, function () {})
