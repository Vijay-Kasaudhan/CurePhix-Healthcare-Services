const express=require("express");

const crypto=require("crypto");
const Razorpay=require("razorpay");
const Order=require( "../model/orderSchema.js");
const User=require("../model/users.js");
const Doctor=require("../model/doctors.js");


const router = express.Router();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});
router.post("/checkout",async(req,res)=>{
 

  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  const order = await instance.orders.create(options);
 console.log(typeof(`${order.id}`));
  res.status(200).json({
    success: true,
    order

  });
})

router.post("/paymentVerification",async(req,res)=>{

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature,email,userid,username,userage,usergender,userphone,useraddress,userdate,usertime,name,phone,address,qualification,specialization } =
    req.body;
   
  
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
   const Orders=new Order({ razorpay_order_id, razorpay_payment_id, razorpay_signature});
   Orders.save();
   const user =await User.findOne({_id:userid});
  if(user){
    const appointmentdata=await user.addappointment(username,userage,usergender,userphone,useraddress,userdate,usertime,name,address,qualification,specialization,phone);
     user.save();
    res.status(201).json({message:"appointment data successfull added"})
  }
  // const doctors = await Doctor.findOne({"email":email});
  
  // if(doctors){
  //     const appointmentdata=await doctors.addappointments(username,userage,usergender,userphone,useraddress,userdate,usertime,name,address,qualification,specialization,phone);
  //      doctors.save();
  //     res.status(201).json({message:"appointment data successfull added"})
  // }
 
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

router.get("/getkey",(req,res)=>{
  res.status(200).json({key:process.env.RAZORPAY_API_KEY})
})
module.exports=router;
