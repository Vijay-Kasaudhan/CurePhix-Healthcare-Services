const express=require("express");
const bcrypt=require("bcrypt");
const router=new express.Router();
const Doctor=require("../model/doctors");
const DoctorList=require("../model/doctorslist");
const cookie = require('cookie-parser');
const verifyDoctor=require("../authentication/verifyDoctor");

router.post("/register",async (req,res)=>{
  console.log(req.body);
  
  const{name,phone,email,registrationno,password,cpassword}=req.body;
  try{
  
  if(!name||!email||
    !phone||!registrationno||!password||!cpassword){
     return res.status(404).json({message:"fill th form"})
      
  }
  const find= await Doctor.findOne({"phone":phone});
  if(find){
    return  res.status(404).json({error:"mail already exist"})
  }else if(password!=cpassword){res.status(404).json({error:"password is not same"})}
  else{
  const user=new  Doctor({name,email,phone,registrationno,password,cpassword});

   user.save();
  return res.status(200).json({message:"form submitted"})}}catch(err){
      res.status(404).json({message:"form not submitted"})    }
})
router.post("/Login", async (req,res)=>{

  const {phone,password}=req.body;
  
    const doctorfind=await Doctor.findOne({"phone":phone});
    if(doctorfind){
      const match= await bcrypt.compare(password,doctorfind.password);
      if(!match){
      
        res.status(400).json({error:"invalid credentials"})
      }
     else{
      const token = doctorfind.generateAuthToken();
      res
        .cookie("jwtoken1", token, 
        { expires:new Date(Date.now()+25892000000),httpOnly: true }).json({doctorfind,token});
     }
    }else{
      res.status(400).json({error:"invalid credentials"})
}})

router.get("/Dashboard",verifyDoctor,async (req,res)=>{

 res.status(200).json(req.rootdoctor);
})

router.get("/logout",async (req,res)=>{
  res.clearCookie("jwtoken1",{path:"/"})
  res.status(200).json({message:"user logout"});
})
router.post("/updatedoctorapi",async (req,res)=>{
const{fees,slot1time,slot2time,day1,day2,day3,day4,day5,day6,day7,email}=req.body;

if(fees||slot1time||slot2time||day1||day2||day3||day4||day5||day6||day7){
const Doctor=await DoctorList.findOne({email:email});
if(Doctor){
  // if(fees){
  //   Doctor.fees=fees;
  // }
  // if(slot1time){
  //   Doctor.timeam=slot1time;
  // }
  // if(slot2time){
  //   Doctor.timepm=slot2time;
  // }

  Doctor.fees=fees || Doctor.fees;
  Doctor.timeam=slot1time || Doctor.timeam;
  Doctor.timepm=slot2time || Doctor.timepm;
  Doctor.day1=day1 || Doctor.day1;
  Doctor.day2=day2 || Doctor.day2;
  Doctor.day3=day3 || Doctor.day3;
  Doctor.day4=day4 || Doctor.day4;
  Doctor.day5=day5 || Doctor.day5;
  Doctor.day6=day6 || Doctor.day6;
  Doctor.day7=day7 || Doctor.day7;
  await Doctor.save();
//   if(appointmentday){
//     Doctor.
//   }
res.status(200).json({message:"Doctor Api Updated"})
 }
 else{
  res.status(404).json({message:"Doctor Not Found"})
 }
}
else{
  res.status(404).json({message:"Please Fill the Data"})

}
}) 
router.post("/update",async (req,res)=>{
  const{name,phone,email,address,id}=req.body;
  const doctor=await Doctor.findOne({"phone":id});
  if(doctor){
    doctor.name=name || doctor.name;
    doctor.phone=phone || doctor.phone;
    doctor.email=email || doctor.email;
    doctor.address=address || doctor.address;
    res.status(200).json({message:"Updation Successfull"});
  }else{
    res.status(401).json({error:"Updation Not Successfull"});
  }
})

router.post("/addappointmentdata",async (req,res)=>{
  console.log("dff");
  try{
      const{email,name,age,gender,appointmentday,appointmentdate,appointmenttime,doctor,doctoraddress,doctordegree,doctorspecialization,doctorphone}=req.body;
      const doctors = await Doctor.findOne({"email":email});
      if(doctors){
          const appointmentdata=await doctors.addappointment(name,age,gender,appointmentday,appointmentdate,appointmenttime,doctor,doctoraddress,doctordegree,doctorspecialization,doctorphone);
          await doctors.save();
          res.status(201).json({message:"appointment data successfull added"})
      }
  }catch(error){
      console.log(error);
  }
})
router.post("/updatestatus",async (req,res)=>{
  const{email,status}=req.body;
  console.log(email,status);
  try{const doctor=await DoctorList.findOne({"email":email});
  console.log(doctor);
  if(doctor){
  
    doctor.status=status;
    await doctor.save();
    res.status(201).json({message:"status update successfully"});
    
  }else{
    console.log("error")
    res.status(400).json({message:"some error occurred"});
  }}catch(error){
    res.status(400).json({message:"some error occurred"});
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
const doctor=await Doctor.findOne({"phone":phone});
if(doctor){
  client.messages
    .create({
      body: `Your One Time Login Password For CFM is ${otp}`,
      from: twilioNum,
      to: phone
    })
    .then((messages) => console.log(messages))
    .catch((err) => res.status(404).json({error:"error"}));

 
  res.status(200).json({ fullHash }); 
}else{
  res.status(400).json({error:"Phone number not registered"});
}       
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
   res.status(200).json({message:"otp verified"});
 }else{
  res.status(400).json({message:"otp not verified"});
 }
})
router.post("/updatepassword",async(req,res)=>{
  const{phone,password,cpassword}=req.body;
  const doctor=await Doctor.findOne({"phone":phone})
  if(doctor){
    doctor.password=password;
    doctor.cpassword=cpassword;
      await doctor.save;
   }else{
     return res.status(404).json({error:"user not found"})
  }
})
module.exports=router;