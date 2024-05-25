const jwt=require("jsonwebtoken");
const Admin=require("../model/admin");

const verifyuser=async (req,res,next)=>{
     const token=req.cookies.adminjwtoken;
   
    try{
     const verifyAdmin=jwt.verify(token,process.env.SECRET_KEY);  
     const rootadmin=await User.findOne({_id:verifyAdmin._id,"tokens.token":token});
     if(!rootadmin){throw new Error("user not found")}else{req.token=token;
     req.rootadmin=rootadmin;
     req.AdminID=rootadmin._id;
     next();}
    }catch(err){
     res.status(401).send("unauthorijed:No token provided")
     console.log(err);
    }
}

module.exports=verifyuser;