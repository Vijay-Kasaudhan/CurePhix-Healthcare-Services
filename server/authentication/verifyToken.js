const jwt=require("jsonwebtoken");
const User=require("../model/users.js");

const verifyuser=async (req,res,next)=>{
     const token=req.cookies.jwtoken;
   
    try{
     const verifyToken=jwt.verify(token,process.env.SECRET_KEY);  
     const rootuser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
     if(!rootuser){throw new Error("user not found")}else{req.token=token;
     req.rootuser=rootuser;
     req.UserID=rootuser._id;
     next();}
    }catch(err){
     res.status(401).send("unauthorijed:No token provided")
     console.log(err);
    }
}

module.exports=verifyuser;