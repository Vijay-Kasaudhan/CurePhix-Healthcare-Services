import React, { useState } from 'react';
import logo from "../../image/CurePhix-01.png";
import { useNavigate } from 'react-router-dom';
import "./forgetpassword.css";
const ForgetPassword = () => {
    const[next,setnext]=useState(2);
    const[hash,sethash]=useState("");
    const[input,setinput]=useState({phone:"",otp:"",password:"",cpassword:""});
    const navigate=useNavigate();
    const handleinput=(e)=>{
        setinput((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
    const postphone=async(e)=>{
        e.preventDefault();
        const {phone}=input;
        let res=await fetch("/api/doctors/sendotp",{
               method:"POST",
               headers:{
                   "Content-Type":"application/json"
                 },
                 body:JSON.stringify({phone})
                })
               const data=await res.json();
               if(res.status===400||!data){
               window.alert("invalid credentials");
              }else{
           setnext(2);
           sethash(data.hash);
            }
    }
    const postotp=async(e)=>{
        e.preventDefault();
        const {phone,otp}=input;
        let res=await fetch("/api/doctors/sendotp",{
               method:"POST",
               headers:{
                   "Content-Type":"application/json"
                 },
                 body:JSON.stringify({phone,otp,hash})
                })
               const data=await res.json();
               if(res.status===400||!data){
               window.alert("invalid credentials");
              }else{
           setnext(3);
           
            }
    }
    const postpassword=async(e)=>{
        e.preventDefault();
        const {phone,password,cpassword}=input;
        let res=await fetch("/api/doctors/sendotp",{
               method:"POST",
               headers:{
                   "Content-Type":"application/json"
                 },
                 body:JSON.stringify({phone,password,cpassword})
                })
               const data=await res.json();
               if(res.status===400||!data){
               window.alert("invalid credentials");
              }else{
                navigate("./Doctorslogin")
           
            }
    }
  switch(next){
    case 1:
        return(<>
         <div className="sendotpcontainer">
            <img src={logo} alt=""/>
            <input name='phone' placeholder='Enter Registered Phone No' onChange={handleinput}/>
            <button onClick={postphone}>Sendotp</button>
         </div>
        </>)
    case 2:
        return(<>
          <div className="verifyotpcontainer">
          <img src={logo} alt=""/>
            <input name='phone' placeholder='Enter Registered Phone No' onChange={handleinput}/>
            <input name='otp'  placeholder="Enter otp" onChange={handleinput}/>
            <button onClick={postotp}>Verifyotp</button>
         </div>
        </>)
    case 3:
        return(<>
           <div className="changepasswordcontainer">
           <img src={logo} alt=""/>
            <input name='phone' placeholder='Enter Registered Phone No' value={input.phone}/>
            <input name='password'  placeholder="Password" onChange={handleinput}/>
            <input name='cpassword'  placeholder="Confirm Password" onChange={handleinput}/>
            <button onClick={postpassword}>Verifyotp</button>
         </div>
        </>)
  }
  
  
}

export default ForgetPassword;
