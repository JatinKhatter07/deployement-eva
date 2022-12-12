const express=require("express");

const {TodoModel} = require("../models/todo.model");
const todoRouter=express.Router();


todoRouter.get("/",async(req,res)=>{
    const todos=await TodoModel.find()
    res.send(todos)
})

todoRouter.post("/create",async(req,res)=>{
const data=req.body;
try{
    const newData=new TodoModel(data);
    await newData.save();
    res.send({"msg":"your todo is posted successfully"})
}
catch(err){
    console.log(err)
res.send({"err":"something went wrong in posting data"})
}
})

todoRouter.patch("/update/:todoID", async (req, res) => {
    const todoID = req.params.todoID
    const userID = req.body.userID
    const todos = await TodoModel.findOne({_id:todoID})
    if(userID !== todos.userID){
        res.send("Not Authorised by this user")
    }
    else{
        await TodoModel.findByIdAndUpdate({_id : todoID},data)
        res.send({"msg" : "todos updated successfully"})
    }
})

todoRouter.delete("/delete/:todoID", async (req, res) => {
const todoID = req.params.todoID
const userID = req.body.userID
const todos = await TodoModel.findOne({_id:todoID})
if(userID !== todos.userID){
    res.send("Not Authorised by this user")
}
else{
    await TodoModel.findByIdAndDelete({_id : todoID})
    res.send({"msg" : "Todo deleted successfully"})
}
})



module.exports={todoRouter}