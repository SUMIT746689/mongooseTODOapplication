const express = require('express');
const schemaHandle = require('./schemaHandle');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('./jwtMiddleware');


const routerHandle = express.Router();
const User = mongoose.model("user",schemaHandle);
const saltRounds = 10;


routerHandle.get('/',jwtMiddleware,async (req,res,next)=>{
   const data = await User.find({_id : req.userId}); 
    res.json({data});
})
routerHandle.post('/signup',async(req,res,next)=>{
    try {
        const user = new User({
            name : req.body.name,
            username : req.body.username,
            password : await bcrypt.hash(req.body.password,saltRounds)
        });
    await user.save();
    res.status(200).json({"message":"create sucessfull"})
    }
    catch{
        res.status(500).json({"error":"Can't create new user"})
    }
})

routerHandle.post('/login',async(req,res,next)=>{
    try{
        const user =  await User.find({username :req.body.username});
        console.log(user[0].password);
        if(user && user.length>0){
            const isCorrectUser = await bcrypt.compare(req.body.password,user[0].password )
            if(isCorrectUser){
                const token = await jwt.sign({
                    name : user[0].name,
                    userId : user[0].id
                },process.env.SECRETE_KEY,{expiresIn:'1h'})
                res.status(200).json({
                    token ,
                    message : "Sucessfull"
                })
            }
            else{
                res.status(403).json({"Error":"Unauthentication Error"})
            }
        }
        else{
            res.status(402).json({"Error":"Unauthentication Error"})
        }
    }
    catch{
        res.status(401).json({"Error":"Unauthentication Error"})
    }
})

routerHandle.put('/',jwtMiddleware,(req,res,next)=>{
    
})
routerHandle.delete('/',(req,res,next)=>{
    
})

module.exports = routerHandle ;