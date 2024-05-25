import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {BsCameraFill } from 'react-icons/bs';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';
import userimg from "../../image/userpic.jpg";
// import img from "../../image/vijay.jpg";
import "./dashboard.css";
const Dashboard = () => {
    const navigate=useNavigate();
    const[user,setuser]=useState({});
    const[showupdated,setshowupdated]=useState(false);
    const[editeddata,setediteddata]=useState({
        name:"",
        phone:"",
        email:"",

    })
    const{name,phone,email,Address}=user;
    // const [file, setFile] = useState(null);
    // const [df,setdf]=useState();
     
    const calldashboard= async()=>{
        try{
          let res=await fetch("/api/users/getuserdata",{
                 method:"GET",
                headers:{
                    Accept:"application/json",
                    "content-type":"application/json"
                },credentials:"include"
            });
            const data=await res.json();
            setuser(data)
      
            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
           }catch(err){
            navigate("/Login");
        }
        }

const handlechange=(e)=>{
let name=e.target.name;
let value=e.target.value;
setediteddata((prev)=>({...prev,[name]:value}))}
const postdata= async (e)=>{
    e.preventDefault();
    const{_id}=user;
   const{name,phone,email}=editeddata;
    let res=await fetch("/api/users/updatedata",{
        
        method:"POST",
        headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({_id,name,phone,email})
         })
        const data=await res.json();
        
        if(res.status===400||!data){
        window.alert("invalid credentials");
        console.log("invalid regestration");

      }else{
      window.alert("updated");
      setshowupdated(false);
   
}}



    useEffect(()=>{
        calldashboard()
    },[])
    
  return <><Navbar/>
   <div className={showupdated ? "UserDashboards" : "UserDashboard"}>
        <h4>PERSONAL INFORMATION</h4>
        <div className="Userimages"><img src={userimg} width="140px" height="140px" alt=''/></div>
       <button className='Userimgbtn'> <BsCameraFill style={{width:"25px",height:"25px"}}/></button>
        <div className="user UserName"><h3>Name</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>{name}</span></div>
        <div className="user UserPhone"><h3>Phone</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>{phone}</span></div>
        <div className="user UserEmail"><h3>Email</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>{email}</span></div>
        <div className="user UserEmail"><h3>Age</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>{email}</span></div>
        <div className="user UserEmail"><h3>Gender</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>{email}</span></div>
        <div className="user UserAddress"><h3>Address</h3> <span style={{position:"absolute",  textDecorationLine: 'underline'}}>Greater Noida</span></div>
       <button className='Editbutton' onClick={()=>{setshowupdated(true)}}>Edit Button</button>
    </div>

  
    {/* <form onSubmit={handleSubmit} method="post">
      <input type="file" name='file' onChange={handleFileChange}/>
      <button type="submit">Upload</button>
    </form>
    <button onClick={hjk}>ghj</button>
    <a href={df} download="YOUR_FILE_NAME">
          Download File
        </a> */}
    
    
     <div className={showupdated ? "Userupdate" : "Userupdates"}>
     <div className="userupdateDashboard">
        <form  onSubmit={postdata} method="POST">
          
        <div className="userDashboardinputs">
        <h3>Name</h3>
            <input type="text" name='name' onChange={handlechange} />
        </div>
        <div className="userDashboardinputs">
            <h3>Phone</h3>
            <input type="text" name='phone' onChange={handlechange} placeholder=''/>
        </div>
        <div className="userDashboardinputs">
            <h3>Email</h3>
            <input type="text" name='email' onChange={handlechange} placeholder=''/>
        </div>
        <button className='SubmitButton' type='submit'>Submit</button>
        <button className='CancelButton' type='button' onClick={()=>{setshowupdated(false)}}>Cancel</button>
        </form>
        </div>
     </div>
   
    </>
    
  
}

export default Dashboard;
