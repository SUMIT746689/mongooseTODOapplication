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
    }
})

module.exports = authScheama ;