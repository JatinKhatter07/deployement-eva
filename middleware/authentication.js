const jwt=require("jsonwebtoken");

const authentication=(req,res,next)=>{
    const token=req.header?.authorization?.split(" ")[1]
    if(token){
        const solved=jwt.verify(token,"hmm")

        if(solved){
            const userID=solved.userID
            req.body.userID=userID
            next()
        }else{
            res.send("Please Login Karo!")
        }
    }else{
        res.send("Please Login Karo")
    }
}

module.exports={authentication}