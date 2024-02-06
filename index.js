const express = require('express')
const bodyParser = require('body-parser')
const AWS = require("aws-sdk")
//const CircularJSON = require('circular-json')
//const CyclicDb = require("@cyclic.sh/dynamodb")
//const db = CyclicDb("clean-red-school-uniformCyclicDB")
//const students = db.collection("students")

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
    let data = readData()
    res.status(200).send(data)
})

////////////////////////////////////////////////////////////////////////////////

app.post('/addstudent', function (req, res) {
    let student = req.body
    writeData(student)
    res.status(200).send("student saved !")
})

////////////////////////////////////////////////////////////////////////////////

app.listen(port, function () {})
