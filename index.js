const express = require('express');
const routerHandle = require('./routerHandle');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.json()); 
app.use('/user',routerHandle);
app.use((err,req,res,next)=>{
    if(res.headerSent){
        next(err)
    }
    else{
        res.status(401).json(err);
    }
})
app.listen(3000,()=>console.log("Running..."))