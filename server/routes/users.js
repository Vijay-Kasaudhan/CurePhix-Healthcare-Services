const express=require("express");
const router=new express.Router();
const User=require("../model/users");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require('dotenv').config();
const cookie = require('cookie-parser');
const verifyuser=require("../authentication/verifyToken");
const crypto = require('crypto');
// const smsKey = process.env.SMS_SECRET_KEY;
// const twilioNum = process.env.TWILIO_PHONE_NUMBER;
// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// const multer  = require('multer')
// const upload = multer({ storage: 'storage' })



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })
router.post("/register",async (req,res)=>{
  
    
    const{name,phone,email,address,password,cpassword}=req.body;
    if(!name||!email||!phone||!address||!password||!cpassword){
      
       return res.status(404).json({message:"fill th form"})
       
        }
    const find= await User.findOne({"phone":phone});
    if(find){
      
      return  res.status(404).json({message:"Phone Number already exists"})
      
    }
    else{
      if(cpassword!==password){
        
        return res.status(404).json({message:"cpassword doesn't match"})}else{
    const user=new User({name,email,phone,address,password,cpassword});
     user.save();
     console.log("phj");
    return res.status(200).json({message:"form submitted"}
     
    )}}
    
})

router.post("/Login",async (req,res)=>{
  
const{phone,password}=req.body;
if(!phone||!password){
  return res.status(404).json({error:" plz fill the form"})}
  const userfind= await User.findOne({"phone":phone});
    if(userfind){
      const match=await bcrypt.compare(password,userfind.password);
      
      if(!match){
        
        res.status(404).json({error:"invalid credentials"})
      }else{
      
        let token= await userfind.generateAuthToken();
      
      res.cookie("jwtoken",token,{
          expires:new Date(Date.now()+25892000000),
          httpOnly:true,
           });
        res.status(200).json({userfind,token})
          console.log(token)
     }
    }else 
    {
      res.status(404).json({error:"invalid credentials"})
    }
  })

router.get("/logout",async (req,res)=>{
  res.clearCookie("jwtoken",{path:"/"})
  res.status(200).json({message:"user logout"});
})

router.get("/getuserdata",verifyuser,(req,res)=>{
 
   res.status(200).json(req.rootuser)
})
router.post("/updatedata",async (req,res)=>{
  const{_id,name,phone,email}=req.body;
  
  try{
  const user=await User.findById(_id);
 
if(user){
  user.name=req.body.name || user.name;
  user.phone=req.body.phone || user.phone;
  user.email=req.body.email || user.email;
 await user.save();

  res.status(200).json({message:"Updated"})
}else{
  res.status(400).json({message:"Not Updated"})
}
}
catch(err){
    res.status(400).json({message:"Not Updated"})
  }
})
router.post("/addappointmentdata",async (req,res)=>{
  try{
      const{id,name,age,gender,appointmentday,appointmentdate,appointmenttime,doctor,doctoraddress,doctordegree,doctorspecialization,doctorphone}=req.body;
    
      // if(!name||!Reveiw){
      //     return res.status(404).json({error:"plz fill the form"})
      // }
      const user =await User.findOne({_id:id});
      if(user){
          const appointmentdata=await user.addappointment(name,age,gender,appointmentday,appointmentdate,appointmenttime,doctor,doctoraddress,doctordegree,doctorspecialization,doctorphone);
          await user.save();
          res.status(201).json({message:"appointment data successfull added"})
      }
  }catch(error){
      console.log(error);
  }
})
 router.post("/sendotp",async(req,res)=>{
   const phone = req.body.phone;
 	const otp = Math.floor(100000 + Math.random() * 900000);
 	const ttl = 2 * 60 * 1000;
 	const expires = Date.now() + ttl;
 	const data = `${phone}.${otp}.${expires}`;
 	const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
 	const fullHash = `${hash}.${expires}`;

 	client.messages
 		.create({
 			body: `Your One Time Login Password For CFM is ${otp}`,
 			from: twilioNum,
 			to: phone
 		})
 		.then((messages) => console.log(messages))
 		.catch((err) => res.status(404).json({error:"error"}));

	
 	res.status(200).json({ fullHash });        
 })


router.post("/verifyotp",async(req,res)=>{
  const{phone,hash,otp,password,cpassword}=req.body;
  
 	let [ hashValue, expires ] = hash.split('.');

 	let now = Date.now();
 	if (now > parseInt(expires)) {
		return res.status(504).send({ msg: 'Timeout. Please try again' });
	}
 	let data = `${phone}.${otp}.${expires}`;
	let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	if (newCalculatedHash === hashValue) {
     const userfind=await User.findOne({"phone":phone})
    if(userfind){
      userfind.password=password;
      userfind.cpassword=cpassword;
        userfind.save;
     }else{
       return res.status(404).json({error:"user not found"})
    }
  }
})
// router.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })
module.exports=router;