import React, { useEffect, useState } from 'react';
import "./Searchlist.css";
import {Link, NavLink} from "react-router-dom";

import {FaRegThumbsUp} from 'react-icons/fa';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Searchlist = (prop) => {
  const[show,setshow]=useState(false);

  const{_id,name,specialization,phone,timeam,timepm,fees,city,Reccomend,qualification,status}=prop;
  const checkstatus=()=>{
    if(status==="Closed"){
      setshow(true);
    }else{
      setshow(false)
    }
  }
const print=()=>{
  window.print();
}
useEffect(()=>{
  checkstatus();
},[])
  return (<>
      <div className="searchItem">

      <img src=" https://th.bing.com/th?id=OIP.kXVeS9m1B-FEYIBrprATcgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" className="siimg" width="300px" height="300px" alt=''/>
      
       
     
      <div className="siDesc">
        <div className="sidoctornam"><span className="siname">Dr. {name}</span></div>
       <span className="sispecialization">{specialization}</span>
      <span className="siqualification">{qualification}</span>
      <span className="siexperience">
         5 years experience
      </span>
     <span className='siaddress'>{city}</span>
     {/* <div className="siRecommend"> <ThumbUpOffAltIcon style={{fontSize:"22px",marginTop:"5px",marginLeft:"5px"}}/>
    
    <span style={{display:"inline-block",position:"absolute",bottom:'30px',marginLeft:"10px",color:"white"}}>Recommend</span></div> */}
    
       </div>
       <div className="siappointmentday"> <span className='siday'>MON - SAT</span>
     <span className='sitimeam' style={{color:"green"}}>{timeam}</span>
     <span className='sitimepm' style={{color:"green"}}>{timepm}</span></div>
       <div className="sifeesDetail">
        
       <span className="sidoctorfees">Pay <span style={{color:"green"}}>Rs 45 </span>online , Doctor's Fee <span style={{color:"green"}}>Rs {fees}</span> at clinic</span> </div>
          <NavLink to={`/SingleDoctor/${_id}`}><button className="siviewbutton">View Details</button></NavLink>
        <NavLink to={`/Booking/${_id}`}>
            {show===true&& <button className="siCheckButton" disabled>Book &nbsp; Appointment</button>}
            {show===false&& <button className="siCheckButton">Book &nbsp; Appointment</button>}
        </NavLink>
       <div className={show?"sistatus":"sinstatus"}><span style={{color:"white",padding:"20px"}}>Appointment cannot be scheduled for Dr{name}</span></div>
      
      </div></>
);
};
   

export default Searchlist;
