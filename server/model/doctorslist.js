 const mongoose=require("mongoose");
 const DoctorlistSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        
        unique: true,
      },
      timeam:{type:String},
      timepm:{type:String},
      day1:{type:String},
      day2:{type:String},
      day3:{type:String},
      day4:{type:String},
      day5:{type:String},
      day6:{type:String},
      day7:{type:String},
      email:{type:String},
      address: {
        type: String,
        },
        city:{type:String},
        hospitalname:{type:String},
        description:{type:String},
      img: {
        type: String,
      },
     
      qualification: {
        type:String,
        },
        gender:{type:String},
        specialization:{type:String},
        experience:{type:Number},
        fees:{type:Number},
        Reveiws:[{name:{type:String},
        Reveiw:{type:String}}],
        Reccomend:{type:Number},
        status:{type: String,default:"Open"}
       
    },
    { timestamps: true }
 );
 DoctorlistSchema.methods.addreveiw=async function (name,Reveiw){
  try{
    this.Reveiws=this.Reveiws.concat({name,Reveiw});
    await this.save();
    return this.Reveiws;
  }catch(err){
    console.log(error)
  }
 }
 
 
 const DoctorList= mongoose.model("DoctorList", DoctorlistSchema);
module.exports=DoctorList;