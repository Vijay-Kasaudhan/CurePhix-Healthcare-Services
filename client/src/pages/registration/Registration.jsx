import React from 'react';
import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import logo from "../../image/CurePhix-01.png";
import "./Registration.css";
const Registration = () => {
    const navigate=useNavigate();
    const[show,setshow]=useState(true);
    const[message,setmessage]=useState();
const[user,setuser]=useState(
    {name:"",phone:"",email:"",address:"",password:"",cpassword:""});
   console.log(typeof(user.phone))
    const inputhandler=(e)=>{
        setuser((prev)=>({...prev,[e.target.name]:e.target.value}));
        console.log(user);}
        async function postdata(e){
            e.preventDefault();
          
              const{name,phone,cphone,email,address,password,cpassword}=user;
          
               let res = await fetch("/api/users/register",{
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json"
                  },
                  body:JSON.stringify({name,phone,email,address,password,cpassword})
                 })
          
                 const data=await res.json();
                  setmessage(data.message);
                   if(res.status===404){
                         window.alert(data.message);
                         setshow(false);
                      
                       }else{
                        window.alert("successfully registered");
                       navigate("/Login");}
                     
             }
  return (
     <>
    <Navbar/>
    <div className={show ? "notshow" : "show"}><span>Not Registered.{message}</span></div>
    <section>
      <div className="Userregistrationpage">
      <img src={logo}/>
      <form method='POST' onSubmit={postdata}>
      <div className=" Userregistrationinput-field">
        <span>Name</span>
       <input type="text" onChange={inputhandler} style={{padding:"10px"}} on placeholder="" autoComplete="off" name='name'   />

      </div>
      <div className="Userregistrationinput-field1">
      <span>Phone No</span>
          <input type="number" onChange={inputhandler}  pattern="[0-9]{10}" title="10 digit number" style={{padding:"10px"}} on placeholder="" autoComplete="off" name="phone"  />
          <i className='bx bx-hide eye-icon'></i>
      </div>
      <div className=" Userregistrationinput-field1">
        <span>Email</span>
       <input type="email" onChange={inputhandler} style={{padding:"10px"}} on placeholder="" autoComplete="off" name='email' title='Please Enter Correct Email Id'/>
      </div>
      <div className=" Userregistrationinput-field1">
        <span>Address</span>
       <input type="text" onChange={inputhandler} style={{padding:"10px"}} on placeholder="" autoComplete="off" name='address' />
      </div>
      <div className=" Userregistrationinput-field1">
        <span>Password</span>
       <input type="password" onChange={inputhandler} style={{padding:"10px"}} on placeholder="" autoComplete="off"  name='password'/>
       
      </div>
      <div className=" Userregistrationinput-field1">
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
