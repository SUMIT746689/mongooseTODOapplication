const express = require('express');
const routerSchema = require('./routerSchema');
const routerHandler = express.Router();
const mongoose = require('mongoose');
const jwtMiddleware = require('./jwtMiddleware');
const authScheama = require('./authSchema');
const todoScheama = require('./todoSchema');

const Auth = new mongoose.model('Auth',authScheama);
const Todo = new mongoose.model('Todo',todoScheama)

routerHandler.get('/all',jwtMiddleware,async (req,res,next)=>{
    try{
        const todo = await Todo.find()
            .populate('user')
                    
        res.status('200').json({
            ...todo,
            "message" : "Sucessfully Find"
        })    
    
    }
    catch{
            res.status('500').json({"err":"Post Error"})
     }
});

routerHandler.get('/:id',jwtMiddleware,async (req,res,next)=>{
    try{
        const userData = await User.findOne({_id : req.params.id})
        .populate('tokens')
        
            
        res.status('200').json({
                userData,
                "message" : "Sucessfully Find"
        })
    
    }
    catch {
        res.status('500').json({"err":"Post Error"})
    }
   
});

routerHandler.post('/',jwtMiddleware,async (req,res,next)=>{
    try{
        const todo = await new Todo({
            ...req.body,
            auth : req.userId
        });
        todo.save();
        const auth = await Auth.updateOne({_id : req.userId},{
            $push : {todos : todo._id}
        })
        res.status(200).json(todo);
    }
    catch{
        res.status(500).json({"error":"Authentication Failed"});
    }
    
    
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