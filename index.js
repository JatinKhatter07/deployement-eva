const meraserver=require("express");
const cors=require("cors");
const app=meraserver();
require("dotenv").config()
require("dotenv").config()
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const {connection} =require("./config/db");
const {UserModel} =require("./models/users.model") 
const {todoRouter} = require("./routes/todos.route")
const {authentication} = require("./middleware/authentication");


app.use(meraserver.json());
app.use(cors({
    origin :"*"
}))


app.get("/",(req,res)=>{
    res.send("Hello everyone, My name is Jatin Khatter.........!!!!")
})

app.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    const userPresent=await UserModel.findOne({email})
    if(userPresent?.email){
        res.send("Email address is already exist")
    }else{
        try{
            bcrypt.hash(password,4,async function(err,hash){
                const user = new UserModel({email,password:hash})
                await user.save()
                res.send("Congo... Sign-Up is done!!")
            });
        }
        catch(err){
console.log(err);
res.send("something went wrong with SIGN-UP data")
        }
    }
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.find({
            email
        })
        if(user.length>0){
            const unsorted_password=user[0].password;
            bcrypt.compare(password,unsorted_password,function(err,result){
if(result){
    const token=jwt.sign({
        "userID":user[0]._id
    },"hmm")
    res.send({"msg":"Login successfully","Token":(token)})
}else{
res.send("Login Failed : Please check your input data")
}
            })}else{
                res.send("Login Failed : Please check your input data")
            }
    }
    catch(err){
console.log(err);
res.send("something went wrong with your inputss!!")
    }
})

app.use(authentication)
app.use("/todos",todoRouter);


app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log("Connection is established");
      console.log(process.env.name);
    } catch (err) {
      console.log(err);
      console.log({ err: "Something went wrong in running server" });
    }
    console.log("server running on port 8500");
  });

