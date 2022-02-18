const express = require('express');
const routerSchema = require('./routerSchema');
const routerHandler = express.Router();
const mongoose = require('mongoose');
const jwtMiddleware = require('./jwtMiddleware');

const User = new mongoose.model('User',routerSchema);

routerHandler.get('/all',jwtMiddleware,(req,res,next)=>{
    User.find({},(err,user)=>{
        if(err){
            res.status('500').json({"err":"Post Error"})
        }
        else{
            res.status('200').json({
                user,
                "message" : "Sucessfully Find"
            })    
        }
    });
});

routerHandler.get('/:id',(req,res,next)=>{
    User.findOne({_id : req.params.id},(err,user)=>{
        if(err){
            res.status('500').json({"err":"Post Error"})
        }
        else{
            res.status('200').json({
                user,
                "message" : "Sucessfully Find"
            })    
        }
    });
});

routerHandler.post('/',(req,res,next)=>{
    
    const user = new User(req.body);
    user.save((err)=>{
        if(err){
            res.status('500').json({"err":"Post Error"})
        }
        else{
            res.status('200').json({
                user,
                "message" : "Sucessfully Post"
            })    
        }
    }); 
});
routerHandler.post('/all',(req,res,next)=>{
    
    User.insertMany(req.body,(err,data)=>{
        if(err){
            res.status('500').json({"err":"Post Error"})
        }
        else{
            res.status('200').json({
                data,
                "message" : "Sucessfully Post"
            })    
        }
    }); 
});
routerHandler.put('/:id', (req,res,next)=>{
    
    User.update({_id : req.params.id},{status : "inactive"},(err,data)=>{
        if(err){
            res.status('500').json({"err":"Post Error"})
        }
        else{
            res.status('200').json({
                data,
                "message" : "Sucessfully PUT"
            })    
        }
    }); 
});
routerHandler.put('/all/:id',(req,res,next)=>{
    
    User.updateMany({name : req.body.id},{status : "inactive"},(err,data)=>{
        if(err){
            res.status('500').json({"err":"Post Error"})
        }
        else{
            res.status('200').json({
                data,
                "message" : "Sucessfully PUT"
            })    
        }
    }); 
});
routerHandler.delete('/:id',async (req,res,next)=>{
    try{
        const value = await User.deleteOne({_id : req.params.id});
        res.status(200).json({
            value,
            "success" : "Sucessfully Deleted"
        });    
    }
    catch{
        res.status(500).json({Error :'error Delete'});
    }
});
routerHandler.delete('/',async (req,res,next)=>{
    try{
        const value = await User.deleteMany({name : 'Shakil'});
        res.status(200).json({
            value,
            "success" : "Sucessfully Deleted"
        });    
    }
    catch{
        res.status(500).json({Error :'error Delete'});
    }
});

module.exports = routerHandler ;