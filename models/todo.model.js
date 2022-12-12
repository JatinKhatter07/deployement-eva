const mongoose=require("mongoose");

const todoSchema=mongoose.Schema({
    taskName:{type:String},
    status:{type:String},
    tag:{type:String}
})

const TodoModel=mongoose.model("todos",todoSchema)

module.exports={
    TodoModel
}