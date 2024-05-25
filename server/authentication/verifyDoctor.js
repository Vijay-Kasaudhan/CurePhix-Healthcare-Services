const jwt=require("jsonwebtoken");
const Doctor=require("../model/doctors.js");
const verifyDoctor=async (req,res,next)=>{
const token=req.cookies.jwtoken1;
try{
const verifyDoctor=jwt.verify(token,process.env.DOCTORSECRET_KEY); 
const rootdoctor=await Doctor.findOne({_id:verifyDoctor._id,"tokens.token":token});

if(!rootdoctor){res.json({error:" not found"})}else{req.token=token;
req.rootdoctor=rootdoctor;
req.DoctorID=rootdoctor._id;
next();}
    }catch(err){
     res.status(401).send("unauthorijed:No token provided")
     console.log(err);
    }
}
module.exports=verifyDoctor;