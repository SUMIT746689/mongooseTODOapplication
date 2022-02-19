const mongoose = require('mongoose');

const todoScheama = mongoose.Schema({
    name : String,
    description : String,
    auth : {
        type : mongoose.Types.ObjectId,
        ref : 'Auth'
    }
})

module.exports = todoScheama ;