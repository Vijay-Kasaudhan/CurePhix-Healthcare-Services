  const mongoose=require("mongoose");
  const bcrypt=require("bcrypt");
  const jwt=require("jsonwebtoken");
   const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
     phone: {
      type: String,
 
    },
    address: {
      type: String,
      
      },
    password: {
      type: String,
      },
    cpassword:{type: String,
      },
    isAdmin: {
      type: Boolean,
      default: false,
    },file:[{Key:{type:String},Bucket:{type:String}}]
  ,appointmentdata:[{name:{type:String},age:{type:String},gender:{type:String},phone:{type:String},address:{type:String},appointmentdate:{type:String},appointmenttime:{type:String},doctorname:{type:String},doctoraddress:{type:String},doctorphone:{type:Number},doctordegree:{type:String},doctorspecialization:{type:String}}]},
  { timestamps: true }
);

UserSchema.pre("save",async function(next){
  if(this.isModified("password")){
      this.password=await bcrypt.hash(this.password,12);
      this.cpassword=await bcrypt.hash(this.password,12);
  }
  next();
})


UserSchema.methods.generateAuthToken=async function(){
  try{
      let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
     
      return token;
  }catch(err){   
      console.log(err);
  }
}
UserSchema.methods.addfile=async function (Key,Bucket){
  try{
    this.file=this.file.concat({Key,Bucket});
    await this.save();
    return this.file;
  }catch(err){
    console.log(err)
  }
 }
 UserSchema.methods.addappointment=async function (name,age,gender,phone,address,appointmentdate,appointmenttime,doctorname,doctoraddress,doctordegree,doctorspecialization,doctorphone){
  try{
  this.appointmentdata=this.appointmentdata.concat({name,age,gender,phone,address,appointmentdate,appointmenttime,doctorname,doctoraddress,doctordegree,doctorspecialization,doctorphone})
  await this.save();
  return this.appointmentdata;
  }catch(err){
         console.log(err);
  }
 }
const User= mongoose.model("User", UserSchema);
module.exports=User;
