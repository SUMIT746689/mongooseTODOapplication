const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Todo');

const routerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }, 
    username : {
        type : String,
        required  : true,
    },
    password : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['active','inactive']
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = routerSchema ;