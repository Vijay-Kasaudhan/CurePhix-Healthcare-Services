import React, { useEffect, useState } from 'react'
import Navbar from '../../DoctorComponent/Navbar/Navbar';
import axios from "axios";
import "./DoctorApi.css";
const DoctorApi = () => {
    const[input,setinput]=useState({name:"",phone:"",timeam:"",timepm:"",email:"",city:"",address:"",description:"",qualification:"",gender:"",specialization:"",experience:"",fees:"",day1:"",day2:"",day3:"",day4:"",day5:"",day6:"",day7:""});
    const handleinput=(e)=>{
        setinput((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const Postdata=async()=>{
        const{name,phone,timeam,timepm,email,city,address,description,qualification,gender,specialization,experience,fees,day1,day2,day3,day4,day5,day6,day7}=input;
      
        let res = await axios.post("/api/doctorlist/add",{
            
            name,phone,timeam,timepm,day1,day2,day3,day4,day5,day6,day7,email,city,address,description,qualification,gender,specialization,experience,fees
           })
    
           
             
             if(res.status===200){
                window.alert("data posted");
                   
                   
                 }else{
                    window.alert("invalid regestration");
                 }
                
                
               
      
    }
  return (<>
  <Navbar></Navbar>
  <div className="DoctorApiContainer">
   <form onSubmit={Postdata} method='Post'>
    <div className="Doctorapiinput">
        <input type='text' name="name" onChange={handleinput} placeholder='name'/>
    </div>
    <div className="Doctorapiinputs">
        <input type='text' name="phone" onChange={handleinput} placeholder='Phone'/>
    </div>
    <div className="Doctorapiinput">
        <input type='email' name="email" onChange={handleinput} placeholder='Email'/>
    </div>
    <div className="Doctorapiinputs">
        <input type='text' name="timeam" onChange={handleinput} placeholder='Slot 1 Time'/>
    </div>
    <div className="Doctorapiinput">
        <input type='text' name="timepm" onChange={handleinput} placeholder='Slot 2 Time'/>
    </div>
   
    <div className="Doctorapiinputs">
        <input type='text' name="address" onChange={handleinput} placeholder='Full Address'/>
    </div>
    <div className="Doctorapiinput">
        <input type='text' name="city" onChange={handleinput} placeholder='City'/>
    </div>
    <div className="Doctorapiinputs">
        <input type='text' name="description" onChange={handleinput} placeholder='About Yourself'/>
    </div>
    <div className="Doctorapiinput">
        <input type='text' name="qualification" onChange={handleinput} placeholder='Qualification'/>
    </div>
    <div className="Doctorapiinputs">
        <input type='text' name="specialization" onChange={handleinput} placeholder='Specialization'/>
    </div>
    <div className="Doctorapiinput">
        <input type='text' name="experience" onChange={handleinput} placeholder='Experience'/>
    </div>
    <div className="Doctorapiinputs">
        <input type='text' name="fees" onChange={handleinput} placeholder='Fees'/>
    </div>
    <div className="Doctorapiinput">
        <input type='text' name="gender" onChange={handleinput} placeholder='Gender'/>
    </div>
    
    <div className="Doctorapiinput">
            <h3>Appointment Day</h3>
           <span>
            <input type="radio" name='day1' onChange={handleinput} value="Sunday" placeholder='' />
            <label>Sunday</label></span>
            <span>
            <input type="radio" name='day2' onChange={handleinput} value="Monday" placeholder=''/>
            <label>Monday</label></span>
            <span>
            <input type="radio" name='day3' onChange={handleinput} value="Tuesday" placeholder=''/>
            <label>Tuesday</label></span>
            <span>
            <input type="radio" name='day4' onChange={handleinput} value="Wednesday" placeholder=''/>
            <label>Wednesday</label></span>
            <span>
            <input type="radio" name='day5' onChange={handleinput} value="Thursday" placeholder=''/>
            <label>Thursday</label></span>
            <span>
            <input type="radio" name='day6' onChange={handleinput} value="Friday" placeholder=''/>
            <label>Friday</label></span>
            <span>
            <input type="radio" name='day7' onChange={handleinput} value="Saturday" placeholder=''/>
            <label>Saturday</label></span>
           
        </div>
    <button >Submit</button>
   </form>
   </div>
   </>
  )
}

export default DoctorApi;
