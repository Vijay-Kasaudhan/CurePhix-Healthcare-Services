const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const AdminSchema=new mongoose.Schema({
    phone1:{type:Number,required:true,},
    phone2:{type:Number,required:true,},
    email1:{type:String,required:true},
    email2:{type:String,required:true},
    password:{type:String,required:true,},
    uniquekey:{type:String,required:true}},
    { timestamps: true }
)


AdminSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
       
        return token;
    }catch(err){   
        console.log(err);
    }
  }
  AdminSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12);
        
    }
    next();
  })
  AdminSchema.pre("save",async function(next){
    if(this.isModified("uniquekey")){
        this.uniquekey=await bcrypt.hash(this.uniquekey,12);
        
    }
    next();
  })

const Admin=mongoose.model("Admin",AdminSchema);
module.exports=Admin;