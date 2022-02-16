const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/user")

const schemaHandle =  mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username :{
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    status : {
        type: String,
        enum : ['active','inactive']
    }
})

module.exports = schemaHandle;