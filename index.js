const express = require('express');
const mongoose = require('mongoose');
const routerHandler = require('./routerHandler');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/',routerHandler);

app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({"Error": "server side error"})
    }
    
})

app.listen(PORT,()=>console.log('Listening...'))