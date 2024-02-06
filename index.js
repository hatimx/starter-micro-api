const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 3000

let students = JSON.parse("{}") 

////////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
  res.status(200).send("Welcome to API on CYLIC Server")
})

app.post('/', function (req, res) {
  res.status(200).send("Welcome to API on CYLIC Server")
})

////////////////////////////////////////////////////////////////////////////////

app.get('/students', function (req, res) {
    res.status(200).send(students)
})

////////////////////////////////////////////////////////////////////////////////

app.post('/addstudent', function (req, res) {
    let student = req.body
    keys = Object.keys(student)
    fkey = keys[0]
    students[fkey] = student[fkey]
    res.status(200).send("student saved successfully !")
})

////////////////////////////////////////////////////////////////////////////////

app.listen(port, function () {})
