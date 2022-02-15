const express = require('express'); 
const routerHandler  = express.Router();
const mongoose = require('mongoose');
const mongooseSchema = require('./mongooseSchema');

const Todo =new mongoose.model("MyTodo",mongooseSchema);

routerHandler.get("/",(req,res,next)=>{
    Todo.find({},(err,data)=>{
        if(err){
            res.status(500).json({"Error":"There is a error to instert"})
        }
        else{
            res.status(200).json({
                data,
                Message: "Instert sucessfull"})
        }
    })
})
routerHandler.get("/staticHandle",async(req,res,next)=>{
    Todo.staticMany((err,data)=>{
        if(err){
            res.status(500).json({"Error":"There is a error to GET"})
        }
        else{
            res.status(200).json({
                data,
                Message: "find form instant sucessfull"})
            
        }
    })
    // try{
    //     const data = await Todo.staticOne();
    //     res.status(200).json({
    //         data,
    //         Message: "find form instant sucessfull"})
    // }
    // catch{
    //     res.status(500).json({"Error":"There is a error to GET"})    
    // }
})
routerHandler.get("/queryDatas",async(req,res,next)=>{
    try{
        const data = await Todo.find().queryDatas('y')
        res.status(200).json({
            data,
            Message: "find form instant sucessfull"
        })
    }
    catch{
        res.status(500).json({"Error":"There is a error to instert"})
    }
})
routerHandler.get("/:id",(req,res,next)=>{
    
    const value =new Todo({_id:req.params.id});
    value.findone((err,data)=>{
        if(err){
            res.status(500).json({"Error":"There is a error to instert"})
        }
        else{
            res.status(200).json({
                data,
                Message: "find form instant sucessfull"})
            
        }
    });
   
})
routerHandler.post("/",(req,res,next)=>{
    console.log(req.body);
    const todo = new Todo(req.body);
    todo.save(err=>{
        if(err){
            res.status(500).json({"Error":"There is a error to instert"})
        }
        else{
            res.status(200).json({
                Message: "Instert sucessfull"})
            
        }
    });
})
routerHandler.post("/all",(req,res,next)=>{
    Todo.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({"Error":"There is a error to instert"})
        }
        else{
            res.status(200).json({"Message":"Instert sucessfull"})
            
        }
    })
})
routerHandler.put("/:id",(req,res,next)=>{
    Todo.updateOne({_id: req.params.id},{status : 'incative'},(err)=>{
        if(err){
            res.status(500).json({"Error":"There is a error to Updated"})
        }
        else{
            res.status(200).json({"Message":"Updated sucessfull"})
            
        }
    })
})
routerHandler.delete("/:id",(req,res,next)=>{
    Todo.deleteMany({},err=>{
        if(err){
            res.status(500).json({"Error":"There is a error to Deleted"})
        }
        else{
            res.status(200).json({"Message":"Deleted sucessfull"})
            
        }
    })
})

module.exports = routerHandler ;