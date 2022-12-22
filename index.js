const express = require('express');
const bodyParser = require('body-parser');
const PORT = 4000;

//local connect
const connect = require('./db')
const employeeRoutes = require('./controllers/employee.controller')
const app = express();

//middleware 
app.use(bodyParser.json())
app.use('/api/employees' , employeeRoutes)


connect()
.then(()=>{
    console.log(`db connection successfully started`)
    app.listen(PORT , ()=>{
        console.log(`server running at ${PORT}`);
    })
})
.catch((err)=>console.log(err))