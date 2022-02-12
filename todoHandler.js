const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const todoSchema = require('./todoSchema');
const todoHandler = express.Router(); 
const Todo = new mongoose.model("Todo",todoSchema);

//get router
todoHandler.get('/',(req,res,next)=>{
    Todo.find({title : "Ridoy"})
        .select({date : 1})
        .limit(2)
        .exec((err,data)=>{
            if(err){
                res.status(500).json('Server side error');
            }
            else{
                res.status(200).json({
                    data,
                    message : "Successfully finds collections"
                })
            }
        });
})


todoHandler.get('/:id',(req,res,next)=>{

    Todo.find({_id: req.params.id},(err,data)=>{
        if(err){
            res.status(500).json('Server side error');
        }
        else{
            res.status(200).json({
                data,
                message : "Successfully finds collections"
            })
        };
    })
}) 

//post router  
todoHandler.post('/',(req,res,next)=>{
    const newTodo = new Todo(req.body);
    newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error : 'There is a server side error' 
            })
        }
        else{
            res.status(200).json({
                success : "Sucessfully post"
            })
        }
    })
}) 
todoHandler.post('/all',(req,res,next)=>{
    
    Todo.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({
                error : 'There is a server side error' 
            })
        }
        else{
            res.status(200).json({
                success : 'Sucessfully insert many'
            })
        }
    })
})

//put router
todoHandler.put('/:id',(req,res,next)=>{
    Todo.updateOne({_id : req.params.id},{status : 'active'},(err)=>{
        if(err){
            res.status(500).json({
                error : 'There is a server side error' 
            })
        }
        else{
            res.status(200).json({
                success : 'Sucessfully updated'
            })
        }
    })
})

//delete router
todoHandler.delete('/:id',(req,res,next)=>{
    Todo.deleteOne({_id : req.params.id},(err)=>{
        if(err){
            res.status(500).json({
                error : 'There is a server side error' 
            })
        }
        else{
            res.status(200).json({
                success : 'Sucessfully deleted'
            })
        }
    })
});

module.exports = todoHandler ;
