const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const app=express();
const cors=require("cors");
const cookieParser=require("cookie-parser");
dotenv.config();
const usersRoute =require( "./routes/users.js");
const doctorsRoute =require( "./routes/doctors.js");
const doctorlistRoute=require("./routes/doctorslist.js");
const adminRoute=require("./routes/admin.js");
const filestorageRoute=require("./routes/filestoragesystem.js")
const payment=require("./routes/PaymentRouter.js")
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }

};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});


app.use(cors())
app.use((req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
  next();
}) 
app.use(cookieParser())
app.use(express.json());
app.use("/api/users", usersRoute);
app.use("/api/doctors",doctorsRoute);
app.use("/api/doctorlist",doctorlistRoute);
app.use("/api/admin",adminRoute);
app.use("/api/filestoragesystem",filestorageRoute);
app.use("/api/payment",payment)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
  
  
  app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
  });