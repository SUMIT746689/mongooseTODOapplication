const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./todoHandler');

//express app initialization
const app = express();
app.use(express.json());

//database connection with mongoose
mongoose.connect('mongodb://localhost/todos')
    .then(()=>{console.log('connection Success')})
    .catch((err)=>{ console.log(err)})

//applications routes
app.use('/',todoHandler);

//default error handler
app.use((err,req,res,next)=>{
    if(res.headersSent){
        return next(err);
    }
    else{
        res.status(500).send(err);
    }
})

app.listen(3000,()=>{
    console.log('Server running...');
})