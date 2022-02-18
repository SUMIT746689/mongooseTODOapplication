const express  = require("express");
const mongoose = require("mongoose");
const authScheama = require("./authSchema");
const bcrypt = require('bcrypt');
const routerSchema = require("./routerSchema");
const jsonwebtoken = require("jsonwebtoken");
const authHandler = express.Router();

const  Auth = new mongoose.model('Auth',authScheama);
const  User = new mongoose.model('User',routerSchema); 
const  salt = 10 ;

authHandler.post('/signUp/:id',async (req,res,next)=>{
    try{
        const userData = await User.findOne({_id : req.params.id});
        console.log(userData);
        if(userData){
            const bcryptPassword = await bcrypt.hash(process.env.SECRETE_KEY,salt);
            const auth = await Auth({
                name : userData.name,
                username : userData.username,
                password : bcryptPassword
            })
            auth.save();
            res.status('200').json({
                auth,
                "Message" : "Successfully created"
            })
        }
    }
    catch{
        res.status('405').json({"Error" : "Auth Data Post fail"})
    }
});
authHandler.post('/login/:id', async (req,res,next)=>{
    try{
        const userData = await User.findOne({_id : req.params.id});
        if(userData){
            const authData = await Auth.findOne({name : userData.name})
            if(authData){
                const bcryptPassword = await bcrypt.compare(process.env.SECRETE_KEY,authData.password);
                if(bcryptPassword){
                    const token = jsonwebtoken.sign({
                        name : authData.name,
                        username : authData.username
                    },process.env.SECRETE_KEY,{expiresIn : '120000'});
                    console.log(token);
                }
            }
        }
        res.status('200').json({
            userData,
            "Message" : "Successfully created"
        })
    }
    catch{
        res.status('500').json({"Error" : "Authentication Failed"})
    }   
    
});

module.exports = authHandler ;