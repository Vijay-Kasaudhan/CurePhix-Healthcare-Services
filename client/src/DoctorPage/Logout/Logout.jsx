import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../DoctorComponent/Navbar/Navbar'


const Logout = () => {
  const navigate=useNavigate();

  const logout=async ()=>{
     let res=await fetch("/api/doctors/logout",{
        method:"GET",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      if(res.status===200){
        localStorage.removeItem("doctorToken")
        localStorage.removeItem("doctoremail");
        navigate("/DoctorsLogin");
     
    }else{window.alert("problem in logout")}
 }
  useEffect(()=>{
    logout()}
  )
    
 return<>
</>
}

export default Logout
