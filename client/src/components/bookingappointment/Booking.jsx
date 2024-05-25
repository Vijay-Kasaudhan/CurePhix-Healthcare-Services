import React, { useState ,useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Booking.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import img from "../../image/PRINCE.jpg";
import { useDoctorContext } from "../../context/Doctorcontext.js";
const API = "http://localhost:8800/api/doctorlist/get/";
function Booking() {
  const navigate=useNavigate();
  const {singleDoctor,getSingleDoctor } =
  useDoctorContext();
  const { id } = useParams();
   const{id:alias,name,phone,email,timeam,timepm,day1,day2,day3,day4,day5,day6,day7,address,description,qualification,Gender,specialization,experience,fees}=singleDoctor;


 const[input,setinput]=useState({
userid:"", username:"",userphone:"",userage:"",usergender:"",useraddress:"",userdate:"",usertime:""
 })
 
const Booking_charge=45;
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 const inputhandler=(e)=>{
setinput((prev)=>
  ({...prev,[e.target.name]:e.target.value})
)
 }

  const bookappointment=async()=>{
    try{
      let res=await fetch("/api/users/getuserdata",{
            
            method:"GET",
            headers:{
                Accept:"application/json",
                "content-type":"application/json"
            },credentials:"include"
        });
        const data=await res.json();
        setinput({userid:data._id})
        if(!res.status===200){
            const error=new Error(res.error);
            throw error;
        }
       }catch(err){
        navigate("/Login");
        }
    }
   
   
    
const checkouthandler=async (e)=>{
  e.preventDefault();
  const{userid,username,userphone,useraddress,userage,usergender,usertime,userdate}=input;
  const date=new Date(userdate);
  const day=weekday[date.getDay()];
        const amount=1;
        if(username&&(userphone.length===10)&&useraddress&&
        userage&&usertime&&userdate&&usergender){
        if(day===day1||day===day2 || day===day3||day===day4||day===day5||day===day6||day===day7){
        const { data: { key } } = await axios.get("http://localhost:8800/api/payment/getkey")

      
        const res = await fetch('/api/payment/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({amount})
        });
        const data = await res.json();
       
        const options = {
          key,
          amount: data.amount,
          currency: 'INR',
          name: 'Your Company Name',
          description: 'Purchase Description',
          order_id: data.order.id,
          handler:  function (response) {
           const razorpay_payment_id=response.razorpay_payment_id;
           const razorpay_order_id=response.razorpay_order_id;
           const razorpay_signature=response.razorpay_signature
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            
          // const res=  axios.post("http://localhost:8800/api/payment/paymentverification",{
          //     razorpay_payment_id, razorpay_order_id,razorpay_signature,userid,username,userphone,useraddress,userage,usertime,userdate
          //   })
            fetch('/api/payment/paymentverification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({ razorpay_payment_id, razorpay_order_id,razorpay_signature,userid,username,userphone,useraddress,userage,usergender,usertime,userdate,email,name,phone,address,qualification,specialization})
          });
            
          },
          prefill: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            contact: '9876543210',
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }else{
        window.alert("Sorry for today appointment can't be fixed for particular doctor,because os his weekend.")
      }
        }else{
          window.alert("Fill the Details");
        }
    }



  useEffect(()=>{
    bookappointment()
  },[])

  useEffect(() => {
    getSingleDoctor(`${API}${id}`);
  }, []);
  
    return (<>
<Navbar/>
<div className="bookingpagecontent"><span  style={{fontFamily:"'Anybody', cursive",color:"darkblue",fontWeight:"bolder"}}></span><br/><br/>
<span style={{fontSize:"20px",marginLeft:"-65px",fontFamily:"'Open Sans', sans-serif",fontWeight:"bolder"}}></span>
</div>
   <div className="bookingdetails">
   <p style={{fontFamily:"'Anybody', cursive"}}>Book your Appointment :-</p>
    <div className="bookingcontainer">
       
        <div className="personaldetails"><br/><br/>
   
            <span>Personal Details :-</span><br/><br/>
            <form  onSubmit={checkouthandler}>
            <div className="inputbox">
                <input type="text" name="username" placeholder=' Name'  onChange={inputhandler}/><br/><br/>
              </div>
              <div className="inputbox">
                <input type="text" name="userage" placeholder=' Age'onChange={inputhandler}/><br/><br/>
              </div>
              <div className="inputbox">
                <input type="text" name="usergender" placeholder=' Gender'onChange={inputhandler}/><br/><br/>
              </div>
              <div className="inputbox">
                <input type="number" min="10" max="10" name="userphone" on placeholder=' Phone Number'onChange={inputhandler}  pattern="[0-9]{10}" title="10 digit number"/><br/><br/>
              </div>
              <div className="inputbox">
                <input type="text" name="useraddress" placeholder='Address' onChange={inputhandler}/><br/><br/>
              </div><br/><br/>
              <span>Appointment Time :-</span><br/><br/>
              <div className="inputbox">
                <input type="date"  name="userdate" min={new Date().toISOString().split('T')[0]}  onChange={inputhandler} /><br/><br/>
              </div>
              <div className="inputbox">
                <input type="time" name="usertime" onChange={inputhandler} /><br/><br/>
              </div>
              <div className="Bookingbutton" ><button className='btn' type='submit' onClick={checkouthandler}>Book &nbsp; Appointment</button></div>
        </form>
        </div>
        
    </div>
    
   <div className="section">
    <img src={img} width="100px" height="100px" style={{marginTop:"20px",marginLeft:"15px"}}/>
    <div className="sectioninfo">
    <span style={{fontSize:"20px"}}>Dr.{name}</span>
    <span>{qualification}</span>
    <span>{specialization}</span>
    <h4>Appointment days:-</h4>
    <span>{day1} {day2} {day3} {day4} {day5} {day6} {day7}</span>
    <span>{timeam}</span>
    <span>{timepm}</span>
    <span style={{color:"green"}}></span>
    <span style={{color:"green",textDecoration:"underline"}}></span>
    <span>Appointment Fee : <span style={{color:"green"}}>Rs {fees}</span></span>
        <span>Booking Charge : <span style={{color:"green"}}>Rs {Booking_charge}</span></span>
        
    
    </div>
   
    
   </div>
    </div>
    <Footer/>
    </>
  )
}

export default Booking;
