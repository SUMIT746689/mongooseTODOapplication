const express  = require("express");
const mongoose = require("mongoose");
const authScheama = require("./authSchema");
const bcrypt = require('bcrypt');
const routerSchema = require("./routerSchema");
const jsonwebtoken = require("jsonwebtoken");
const authHandler = express.Router();

const  Auth = new mongoose.model('Auth',authScheama);

const  salt = 10 ;

authHandler.post('/signUp',async (req,res,next)=>{
    try{
        const bcryptPassword = await bcrypt.hash(process.env.SECRETE_KEY,salt);
        const auth = await Auth({
            name : req.body.name,
            username : req.body.username,
            password : bcryptPassword,    
        })
        auth.save();
        res.status('200').json({
            auth,
            "Message" : "Successfully created"
        })    
    }
    catch{
        res.status('405').json({"Error" : "Auth Data Post fail"})
    }
});
authHandler.post('/login/:id', async (req,res,next)=>{
    try{
        const authData = await Auth.findOne({_id : req.params.id})
        if(authData){
            const bcryptPassword = await bcrypt.compare(process.env.SECRETE_KEY,authData.password);
            if(bcryptPassword){
                const token = jsonwebtoken.sign({
                    name : authData.name,
                    id : authData.id
                },process.env.SECRETE_KEY,{expiresIn : '5d'});
                res.status('200').json({
                    token,
                    "Message" : "Successfully created"
                })
            }
        }        
    }
    catch{
        res.status('500').json({"Error" : "Authentication Failed"})
    }   
    
});
authHandler.get('/all',async (req,res)=>{
    const auth = await Auth.find({}).populate('todos');
    res.json(auth); 
})

module.exports = authHandler ;