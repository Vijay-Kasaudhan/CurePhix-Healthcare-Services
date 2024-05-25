const mongoose=require("mongoose");
const OrderSchema=new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
        unique: true,
      },
      razorpay_payment_id: {
        type: String,
        required: true,
        unique: true,
      },
      razorpay_signature: {
        type: String,
        required: true,
        unique: true,
      },
     
   
       
       
    },
    { timestamps: true }
 );
 const Order= mongoose.model("Order", OrderSchema);
 module.exports=Order;