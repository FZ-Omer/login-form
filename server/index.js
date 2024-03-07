const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employees')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/users");

app.post('/login', (req, res) => {
    const {email, password} = req.body
    EmployeeModel.findOne({email: email})
    .then(user => {
        if (user){
            if (user.password === password){
                res.json("Success")
            }else{
                res.json("Password is Incorrect")
            }
        }else{
            res.json("User Doesn't Exist")
        }

    })
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))

})


const port = 3001

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

