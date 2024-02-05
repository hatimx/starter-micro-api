const express = require('express')
const AWS = require("aws-sdk")
const CircularJSON = require('circular-json')

const s3 = new AWS.S3()
const app = express()
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
  return data.body
}

async function readData2(){
    try {
        let data = await s3.getObject({
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "data/data.json",
        }).promise()
    } 
    catch (error) {
        data = error
    }
    return data
}
////////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
  res.status(200).send("Welcome to API on CYLIC Server")
})

////////////////////////////////////////////////////////////////////////////////

app.get('/students', async function (req, res) {
    let data = await s3.getObject({
            Bucket: "cyclic-clean-red-school-uniform-eu-west-2",
            Key: "data/data.json",
        }).promise() 
    //let data = readData2()
    res.status(200).send(data)
})

////////////////////////////////////////////////////////////////////////////////

app.post('/addstudent', function (req, res) {
    let student = req.body
    writeData(student)
    res.status(200).send("student added succesfully !")
})

////////////////////////////////////////////////////////////////////////////////

app.listen(port, function () {})
