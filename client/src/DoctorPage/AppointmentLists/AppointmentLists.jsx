import React,{useState,useEffect} from "react"

import Navbar from "../../DoctorComponent/Navbar/Navbar"
import {useAppointmentContextdoctor} from "../../context/Appointmentcontextdoctor";
import AppoinmentCards from "../../DoctorComponent/AppointmentCards/AppointmentCards";
import "./AppointmentLists.css";
const AppointmentLists=()=>{
    const[show,setshow]=useState(false);
    const {Appointmentdatas,updateFilterValue,dispatch,filterappointmentdatas}=useAppointmentContextdoctor();
    
            // useEffect(()=>{
            //   calldashboard()
            // },[])
            
            useEffect(()=>{
              const calldashboards= async()=>{
                
                  let res=await fetch("/api/doctors/Dashboard",{
                          method:"GET",
                        headers:{
                            Accept:"application/json",
                             "content-type":"application/json"
                         },credentials:"include"
                     });
                     const data=await res.json();
                     
                     dispatch({ type: "LOAD_APPOINTMENT_DATA", payload:data.appointmentdata });
                   
                     if(!res.status===200){
                         const error=new Error(res.error);
                         throw error;
                     }     
         
                    
                 }
             calldashboards()
            },[])
            // useEffect(()=>{
            //   dispatch({type:"FILTER_CURRENTAPPOINTMENT_DATA"})
            // },[Appointmentdatas])
            useEffect(()=>{
              dispatch({type:"FILTER_CURRENTAPPOINTMENT_DATA"})
            })
       const appointmenthistory=()=>{

        setshow(true);
       }

    return<>
    <Navbar/>
    <div className={show ? "currentappointments":"currrentappointment"}>
     <div>
        {filterappointmentdatas.map((curelem)=>{
        return <AppoinmentCards key={curelem._id}{...curelem}/>
      })}  
     
     </div>
       
     
    <div className="Appointmenthistory">
    <button onClick={appointmenthistory}>Appointment History</button>
    </div>
    </div>
    <div className={show ? "allappointment":"allappointments"}>
    <div>
        {Appointmentdatas.map((curelem)=>{
        return <AppoinmentCards key={curelem._id}{...curelem}/>
      })}  
     
     </div>
     <input type="date" name='date' onChange={updateFilterValue} />  
    </div>
   
 
    </>
}
export default AppointmentLists;