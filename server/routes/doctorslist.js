const express=require("express");
const router=new express.Router();
const DoctorList=require("../model/doctorslist");
router.post("/add",async (req,res)=>{
    
    const{name,phone,timeam,timepm,day1,day2,day3,day4,day5,day6,day7,email,city,address,description,qualification,gender,specialization,experience,fees}=req.body;
    
    const Doctors=new DoctorList({name,phone,timeam,day1,day2,day3,day4,day5,day6,day7,timepm,email,city,address,description,qualification,gender,specialization,experience,fees});
     Doctors.save();
    

    return res.status(200).json({message:"added"}) 
    

})

router.get("/get",async (req,res)=>{
    console.log(req.body);
    try{const find= await DoctorList.find({});
return res.send(find)
}
catch(err){
    res.send(err)
}
})


router.get("/get/:id",async (req,res)=>{
    try{
        const _id=req.params.id;
        const find=await DoctorList.findById({_id});
        res.send(find);
    }catch(e){
        res.status(404).send(e)
    }})
    router.post("/reveiw",async (req,res)=>{
        try{
            const{id,name,Reveiw}=req.body;
            if(!name||!Reveiw){
                return res.status(404).json({error:"plz fill the form"})
            }
            const doctor=await DoctorList.findOne({_id:id});
            if(doctor){
                const doctorreveiw=await doctor.addreveiw(name,Reveiw);
                await doctor.save();
                res.status(201).json({message:"user reveiw successfull"})
            }
        }catch(error){
            console.log(error);
        }
    })


    router.post("/update",async (req,res)=>{
        try{
        const{timeam,timepm,fees,phone}=req.body;
        const doctor=await DoctorList.findOne({"phone":phone});
        if(doctor){
            doctor.timeam=timeam;
            doctor.timepm=timepm;
            doctor.fees=fees;
            await doctor.save();
            res.status(200).json({message:"updated"})
        }
        }catch(error){
            res.status(404).json({message:"Not updated"})
        }
    })
module.exports=router;