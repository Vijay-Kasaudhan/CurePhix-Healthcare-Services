const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
    
    },
    country: {
      type: String,
      
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      
    },
    phone: {
      type: String,
      required: true,
    },
    adhaar:{type:Number,
    },
    registrationno:{type:Number
      
    },
    password: {
      type: String,
      required: true,
    },
    cpassword:{type: String,
        required: true,},
    isAdmin: {
      type: Boolean,
      default: false,
    },appointmentdata:[{name:{type:String},age:{type:String},gender:{type:String},phone:{type:String},address:{type:String},appointmentdate:{type:String},appointmenttime:{type:String},doctorname:{type:String},doctoraddress:{type:String},doctorphone:{type:Number},doctordegree:{type:String},doctorspecialization:{type:String}}]},
  
  { timestamps: true }
);

DoctorSchema.pre("save",async function(next){
  if(this.isModified("password")){
      this.password=await bcrypt.hash(this.password,12);
      this.cpassword=await bcrypt.hash(this.password,12);
  }
  next();
})
DoctorSchema.methods.generateAuthToken = function() {
  let token = jwt.sign(
    {
      _id: this._id,
    
    },
    process.env.DOCTORSECRET_KEY
  );
  return token;
};
DoctorSchema.methods.addappointments=async function (name,age,gender,phone,address,appointmentdate,appointmenttime,doctorname,doctoraddress,doctordegree,doctorspecialization,doctorphone){
  try{
  this.appointmentdata=this.appointmentdata.concat({name,age,gender,phone,address,appointmentdate,appointmenttime,doctorname,doctoraddress,doctordegree,doctorspecialization,doctorphone})
  await this.save();
  return this.appointmentdata;
  }catch(err){
         console.log(err);
  }
 }

const Doctor= mongoose.model("Doctor", DoctorSchema);
module.exports=Doctor;