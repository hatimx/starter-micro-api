const express = require('express')
const bodyParser = require('body-parser')
const AWS = require("aws-sdk")
//const CircularJSON = require('circular-json')

const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb("clean-red-school-uniformCyclicDB")
const animals = db.collection("animals")

const s3 = new AWS.S3()
const app = express()
app.use(bodyParser.json())
const port = 3000

////////////////////////////////////////////////////////////////////////////////

function writeData(data){
    s3.putObject({
            Body: JSON.stringify(data),
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "jsndata.json",
        })
}

function readData(){
  let data = s3.getObject({
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "jsndata.json",
        })
  return data.Body
}

////////////////////////////////////////////////////////////////////////////////

async function writeData2(data){
        await s3.putObject({
            Body: JSON.stringify(data),
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "jsndata.json"
        }).promise()
}

async function readData2(){
        let data = await s3.getObject({
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "jsndata.json"
        }).promise()
    return data
}

////////////////////////////////////////////////////////////////////////////////

async function write_data_db(){
    let leo = await animals.set("leo", {
    type: "cat",
    color: "orange"
    })
}

async function read_data_db(){
    let item = await animals.get("leo")
    return item
}

////////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
  res.status(200).send("Welcome to API on CYLIC Server")
})

app.post('/', function (req, res) {
  res.status(200).send("Welcome to API on CYLIC Server")
})

////////////////////////////////////////////////////////////////////////////////

app.get('/students', function (req, res) {
    let data = read_data_db()
    res.status(200).send(data)
})

////////////////////////////////////////////////////////////////////////////////

app.post('/addstudent', function (req, res) {
    let student = req.body
    write_data_db()
    res.status(200).send("student saved !")
})

////////////////////////////////////////////////////////////////////////////////

app.listen(port, function () {})
