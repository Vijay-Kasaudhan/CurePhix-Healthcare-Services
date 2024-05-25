import React from 'react'
import "./Appoinmentcard.css";
import { WhatsappShareButton } from 'react-share';

const Appoinmentcard = (prop) => {
  


 
  return (
    <>
    <div className="Appointmentcard" id='printablediv'>
      <div className="appointmentslip"><h2>Appointment Slip</h2></div>
       
        <div className="Patientinfo">
          <h3>Patient info:-</h3>
            <span style={{marginTop:"12px",display:"block",color:"black", fontSize:"18px"}}>{prop.name}</span>
            <span style={{marginTop:"8px",display:"block",color:"black", fontSize:"18px"}}>{prop.age} year</span>
            <span style={{marginTop:"8px",display:"block",color:"black", fontSize:"18px"}}>{prop.gender}</span>
            <span style={{marginTop:"8px",display:"block",color:"black", fontSize:"18px"}}>{prop.phone}</span>
        </div>
       
        <div className="Doctorinformation">
          <h3>Doctors info:-</h3>
          <span style={{marginTop:"12px",display:"block",color:"black", fontSize:"18px"}}>Dr.{prop.doctorname}</span>
        <span style={{marginTop:"8px",display:"block",color:"black", fontSize:"18px"}}>{prop.doctordegree}</span>
        <span style={{marginTop:"8px",display:"block",color:"black", fontSize:"16px"}}></span><span style={{marginTop:"8px",display:"block",color:"black", fontSize:"16px"}}></span><span style={{marginTop:"8px",display:"block",color:"black", fontSize:"16px"}}>{prop.doctoraddress}</span>
        <span style={{marginTop:"8px",display:"block",color:"black", fontSize:"18px"}}>{prop.doctorphone}</span></div>
        <div className="Appointmenttime">
          <h3>Appointment info:-</h3>
            <span style={{marginTop:"8px",display:"block", fontSize:"18px"}}>{prop.appointmentdate}</span>
            <span style={{marginTop:"8px",display:"block", fontSize:"18px"}}>Tuesday</span>
            <span style={{marginTop:"8px",display:"block", fontSize:"18px"}}>{prop.appointmenttime}</span>
        </div>
        
       
    </div>
    
    </>
  )
}

export default Appoinmentcard;
