import React,{useState,useEffect} from "react"

import Navbar from "../../components/navbar/Navbar"
import {useAppointmentContextuser} from "../../context/Appointmentcontextuser";
import Appoinmentcard from '../../components/Appointmentcard/Appoinmentcard.jsx';
import "./appointmentlist.css";
const AppointmentList=()=>{
    const[show,setshow]=useState(false);
    const {Appointmentdata,updateFilterValue,dispatch,filterappointmentdata}=useAppointmentContextuser();
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
                console.log(data.appointmentdata)
                dispatch({ type: "LOAD_APPOINTMENT_DATA", payload:data.appointmentdata });
              
                if(!res.status===200){
                    const error=new Error(res.error);
                    throw error;
                }     
    
               }catch(err){
             
            }
            }
            useEffect(()=>{
              calldashboard()
            },[])
            useEffect(()=>{
              dispatch({type:"FILTER_CURRENTAPPOINTMENT_DATA"})
            },[Appointmentdata])
       const appointmenthistory=()=>{

        setshow(true);
       }

    return<>
    <Navbar/>
    <div className={show ? "currentappointments":"currrentappointment"}>
     <div>
        {filterappointmentdata.map((curelem)=>{
        return <Appoinmentcard key={curelem._id}{...curelem}/>
      })}  
     
     </div>
       
     
    <div className="Appointmenthistory">
    <button onClick={appointmenthistory}>Appointment History</button>
    </div>
    </div>
    <div className={show ? "allappointment":"allappointments"}>
    <div>
        {Appointmentdata.map((curelem)=>{
        return <Appoinmentcard key={curelem._id}{...curelem}/>
      })}  
     
     </div>
     <input type="date" name='date' onChange={updateFilterValue} />  
    </div>
   
 
    </>
}
export default AppointmentList;