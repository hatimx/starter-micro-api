const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 3000

let students = JSON.parse("{}")

let student1 = {
    id1 : {
        nom : "test1",
        prenom : "test1",
        classe : "classe1"
    }
}

let student2 = {
    id2 : {
        nom : "test2",
        prenom : "test2",
        classe : "classe2"
    }
}

keys = Object.keys(student1)
fkey = keys[0]
students[fkey] = student1[fkey]

keys = Object.keys(student2)
fkey = keys[0]
students[fkey] = student2[fkey]

students["id3"] = {
    nom : "test3",
    prenom : "test3",
    classe : "classe3"
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
