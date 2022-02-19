const mongoose = require('mongoose');

const authScheama = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    username :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    todos: [
        {
            type: mongoose.Types.ObjectId,
            ref : 'Todo' 
        }
    ]
})

module.exports = authScheama ;