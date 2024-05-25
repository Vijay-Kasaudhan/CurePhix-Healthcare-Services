import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

import "./Logout.css";
const Logout = () => {
  const navigate=useNavigate();
  const checklogin=()=>{
  if(!localStorage.getItem("jwToken")){
    navigate("/home");

  }
  }

  const logout=async ()=>{
       let res=await fetch("/api/users/logout",{
        method:"GET",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      if(res.status===200){
        localStorage.removeItem("jwToken");
       
     
      
      navigate("/Login");
     
      }else{window.alert("problem in logout")}

       
    
    
  }
 useEffect(()=>{
  checklogin()
 },[])
    
 return<><Navbar/>
 <div className="Logoutcontainer">
  <div className="Logoutdesign"></div>
  <div className="logoutlogo"><h1>CurePhix</h1><br/>
  </div>
  <div className="logoutinfo"><span>Do you really want to logout ?</span></div>
  <button  onClick={logout}>YES</button>
  <button style={{marginLeft:"65%"}} onClick={()=>{navigate("/Home")}}>NO</button>
 </div>
</>
}

export default Logout
