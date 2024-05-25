import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {BsCameraFill } from 'react-icons/bs';
import logo from "../../image/CurePhix-01.png";
import axios from "axios";
import Navbar from "../../DoctorComponent/Navbar/Navbar";
import "./Dashboard.css";
const Dashboard = () => {
    const[step,setstep]=useState(1);
    const navigate=useNavigate();
    const[doctorinfo,setdoctorinfo]=useState({name:"",phone:"",email:"",address:"",registrationno:""})
    const{name,phone,email,address,registrationno}=doctorinfo;
    const[Apiupdate,setApiupdate]=useState({Name:"",Phone:"",Email:"",Address:""})
    const callDashboard= async ()=>{
        if(localStorage.getItem("doctorToken")){
try {
    let res=await fetch("/api/doctors/Dashboard",{
        
        method:"GET",
        headers:{
                Accept:"application/json",
                "content-type":"application/json"},
            credentials:"include"
             } );
        const data=await res.json();
        setdoctorinfo(data);
        localStorage.setItem("doctoremail",data.email);
        if(!res.status===200){
            const error=new Error(res.error);
            throw error;
            
        }
        
    } catch (error) {
         window.alert("Check Your Internet Connection")
}
        }
    else{
        navigate("/DoctorsLogin")
    }}
    
const handlechange=(e)=>{

setApiupdate((prev)=>({...prev,[e.target.name]:e.target.value}))
}
const Postupdateddata=async(e)=>{
    e.preventDefault();
    const{Name,Phone,Email,Address}=Apiupdate;
    let res = await fetch("/api/doctors/update",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({Name,Phone,Email,Address,phone})
       })

       const data=await res.json();
         
         if(res.status===404){
               window.alert(data.message);
              
             }else{window.alert("successfull")
             setstep(1);
            }
            
}

    useEffect(()=>{
        callDashboard()
    },[])
    switch(step){
        case 1:
  return (
    <>
  
    <Navbar/>
    <div className='DoctorDashboard'>
        <h4>PERSONAL INFORMATION</h4>
        <div className="Doctorimage"><img src="" width="140px" height="140px" alt=''/> </div>
        <div className="doctor DoctorName"><h3>Name</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>{doctorinfo.name}</span></div>
        <div className="doctor DoctorPhone"><h3>Phone</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>{phone}</span></div>
        <div className="doctor DoctorEmail"><h3>Email</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>{email}</span></div>
        <div className="doctor DoctorAddress"><h3>Address</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>Greater Noida</span></div>
        <div className="doctor DoctorDegree"><h3>Degree</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>MBBS,MD</span></div>
        <div className="doctor DoctorRegistrationNo"><h3>Registration No</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>{registrationno}</span></div>
        <button onClick={()=>{setstep(2)}}>Edit</button>
    </div>
    

    </>)
    case 2:
        return(<>
        <div className="DoctorApiupdate">
        <div className="DoctorApiupdateContainer">
        <form onSubmit={Postupdateddata}  method="POST">
         <img src={logo}/>      
        <div className="DoctorApiupdateinput">
        <h3>Name</h3>
            <input type="text" name='Name' onChange={handlechange} />
        </div>
        <div className="DoctorApiupdateinput">
            <h3>Phone No</h3>
            <input type="text" name='Phone' onChange={handlechange} placeholder=''/>
        </div>
        <div className="DoctorApiupdateinput">
            <h3>Email</h3>
            <input type="text" name='Email' onChange={handlechange} placeholder=''/>
        </div>
        <div className="DoctorApiupdateinput">
            <h3>Address</h3>
            <input type="text" name='Address' onChange={handlechange} placeholder=''/>
        </div>
       
        <button className='SubmitButton' type='submit'>Submit</button>
        <button className='CancelButton' type='button' onClick={()=>{setstep(1)}}>Cancel</button>
        </form>
        </div>
        </div>
        </>)
        case 3:
            return(<>
            <span>Please Check the Internet Connection</span>
            </>)
  }
}

export default Dashboard
