const express=require("express");
const router=new express.Router;
const bcrypt=require("bcrypt");
const User=require("../model/users");
const Doctor=require("../model/doctors");
const Admin=require("../model/admin");
router.post("/adminlogin",async(req,res)=>{
const{email1,email2,phone1,phone2,password,uniquekey}=req.body;
const adminfind=await Admin.findOne({"phone1":phone1,});

if(adminfind){
    const matchpassword= await bcrypt.compare(password,adminfind.password);
    const matchuniquekey=await bcrypt.compare(uniquekey,adminfind.uniquekey);
   
    if(matchpassword){
      
        let token= await adminfind.generateAuthToken();
        console.log("fgfg");
      res.cookie("adminjwtoken",token,{
          expires:new Date(Date.now()+25892000000),
          httpOnly:true,
           });

            res.status(200).json({token});
    }
}

})
router.get("/getusers",async (req,res)=>{
    const user=await User.find({});
    console.log(user);
})
router.get("/getDoctors",async (req,res)=>{
    const doctor=await Doctor.find({});
    console.log(doctor);
})
router.post({})
router.post({})

module.exports=router;