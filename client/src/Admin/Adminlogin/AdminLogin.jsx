import React, { useState } from 'react'
import axios from "axios";
import  "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import logo from "../../image/CurePhix-01.png";
const AdminLogin = () => {
    const[admin,setadmin]=useState({email1:"",email2:"",phone1:"",phone2:"",password:"",uniquekey:""})
 const navigate=useNavigate();
    const handleinput=(event)=>{
    setadmin(prev=>({...prev,[event.target.name]:event.target.value}))
 }
 const PostAdmin=async (e)=>{
    e.preventDefault();
    const{email1,email2,phone1,phone2,password,uniquekey}=admin;
    // let res=await fetch("/api/admin/adminlogin",{
    //     method:"POST",
    //     headers:{
    //         "Content-Type":"application/json"
    //       },
    //       body:JSON.stringify({email1,email2,phone1,phone2,password,uniquekey})})
    //       const data=await res.json();
    let res=await axios.post("/api/admin/adminlogin",{email1,email2,phone1,phone2,password,uniquekey});
       
       if(res.status===200){
        window.alert("successfull");
        navigate("/DoctorApipost");

       }else{
        window.alert("unsuccess");
       }
 }
    return (
    <>
    <section>
    <form method='Post' onSubmit={PostAdmin}>
       
       
        <div className="Adminlogincontainer">
        <div className="Adminloginlogo"> <img src={logo}/></div>
<div className="Adminlogininput">
    <input type='email' name="email1" onChange={handleinput} autoComplete='off' placeholder="Email1" />
</div>
<div className="Adminlogininput">
    <input type='email' name="email2" onChange={handleinput} autoComplete='off' placeholder="Email2"/>
</div>
<div className="Adminlogininput">
    <input type='text' name="phone1" onChange={handleinput} autoComplete='off' placeholder="Phone1" />
</div>
<div className="Adminlogininput">
    <input type='text' name="phone2" onChange={handleinput} autoComplete='off' placeholder="Phone2"/>
</div>
<div className="Adminlogininput">
    <input type='password' name="password" onChange={handleinput} autoComplete='off' placeholder="Password"/>
</div>
<div className="Adminlogininput">
    <input type='text' name="uniquekey" onChange={handleinput} autoComplete='off' placeholder="Uniquekey"/>
</div>
<div className="Adminloginbtn"><button type='Submit'>Submit</button></div>
</div>
   </form>
    </section>
    
    </>
  )
}

export default AdminLogin
