const express = require('express');
const authHandler = require('./authHandler');
const routerHandler = require('./routerHandle');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = 3000 ;
app.use(express.json());

app.use('/user',routerHandler);

app.use('/auth',authHandler);

app.listen(PORT,()=>{
    console.log('Listening...')
})