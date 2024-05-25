import React from 'react';
import { useState } from 'react';
import logo from "../../image/CurePhix-01.png";
import Navbar from '../../DoctorComponent/Navbar/Navbar'
import Footer from '../../components/footer/Footer.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import "./Registration.css";
const Registration = () => {
    const navigate=useNavigate();
const[user,setuser]=useState(
    {name:"",phone:"",email:"",registrationno:"",password:"",cpassword:""});
   
    const inputhandler=(e)=>{
       
       
        setuser((prev)=>({...prev,[e.target.name]:e.target.value}));
        console.log(user);
      }
        async function postdata(e){
            e.preventDefault();
          
              const{name,email,phone,registrationno,password,cpassword}=user;
              if(name&&email&&phone&&registrationno&&password&&cpassword){
               let res = await fetch("/api/doctors/register",{
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json"
                  },
                  body:JSON.stringify({name,email,phone,registrationno,password,cpassword})
                 })
          
                 const data=await res.json();
                   
                   if(res.status===404){
                         window.alert("invalid regestration");
                         console.log("invalid regestration");
                       }else{navigate("/DoctorsLogin")}
                      }
                      else{
                        window.alert("Fill the form Completely");
                      }
                     
             }
  return (
     <>
    <Navbar/>
    <section>
      <div className="registrationpage">
      <img src={logo}/>
      <form method='POST' onSubmit={postdata}>
      <div className=" registrationinput-field">
        <span>Name</span>
       <input type="text" onChange={inputhandler} on placeholder="" autoComplete="off" name='name'   />

      </div>
      <div className="registrationinput-field1">
      <span>Phone No</span>
          <input type="number" onChange={inputhandler} on placeholder="" autoComplete="off" name="phone"  />
          <i className='bx bx-hide eye-icon'></i>
      </div>
      <div className=" registrationinput-field1">
        <span>Email</span>
       <input type="text" onChange={inputhandler} on placeholder="" autoComplete="off" name='email' />
      </div>
      <div className=" registrationinput-field1">
        <span>Registration no</span>
       <input type="text" onChange={inputhandler} on placeholder="" autoComplete="off"  name='registrationno'  />
      </div>
      <div className=" registrationinput-field1">
        <span>Password</span>
       <input type="password" onChange={inputhandler} on placeholder="" autoComplete="off"  name='password'/>
      </div>
      <div className=" registrationinput-field1">
        <span>Confirm Password</span>
       <input type="password" onChange={inputhandler} placeholder="" autoComplete="off"  name='cpassword'  />
      </div>
      <div className="terms"> <span>By signing up,I agree to all terms of service and privacy policy</span></div>
      <button>Sign Up</button>
</form>
   
      </div>
    
    </section>
   
<Footer/>
</>
  )
}

export default Registration
