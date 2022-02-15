const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/AllTodos")

const mongooseSchema = new mongoose.Schema({
    title : String,
    data : {
        type : Date,
        default : Date.now
    },
    status : String,
});

mongooseSchema.methods ={
    findone : function(cb){
        return mongoose.model("MyTodo").find({_id: this.id},cb)
    }
}
mongooseSchema.statics={
    staticOne : function(){
        return this.find({title : "Shakil"}).limit(1)
    },
    staticMany : function(cb){
        return this.find({title : "Sumiya"},cb)
    }
}
mongooseSchema.query={
    queryDatas : function(language){
        return this.find({title : new RegExp(language,"i")})
    }
}

module.exports = mongooseSchema;