import React from 'react';
// import logo from "../../image/logo2.png"
import "./Navbar.css";
import {NavLink} from "react-router-dom";

const Navbar = () => {
  
  if(localStorage.getItem("doctorToken")){
    return <> <div className="navbar">
    <div className="navimg"><img src="" width="200px" height="80px"/></div>
    <div className="headerpage"><ul><li><NavLink to="/Doctorshome"  style={{ textDecoration: 'none' ,color:"black" }}>Home</NavLink></li>
          <li><NavLink to=""  style={{ textDecoration: 'none',color:"black"  }}>Feedback</NavLink></li>
          <li><NavLink to="/contact"  style={{ textDecoration: 'none',color:"black"  }}>Contact Us</NavLink></li>
          <li><NavLink to="/DoctorsDashboard"  style={{ textDecoration: 'none',color:"black"  }}>Dashboard</NavLink></li></ul></div>
          
          <div className="doctorr">
          <span><NavLink to="/PatientAppointmentList" style={{ textDecoration: 'none',color:"black"  }}>Appointment List</NavLink></span>
           </div>
         <div className="navContainer">
      <div className="navItem"><NavLink to="/DoctorsLogout" style={{ textDecoration: 'none',color:"white",fontWeight:"bolder" }}>Logout</NavLink>
     </div>
      
      </div>
      <div className="span1">
      <input type="checkbox"/>
  <div className="left">
  
  <div className="menu">
  <ul>
  <li><NavLink to="/Doctorshome"  style={{ textDecoration: 'none' ,color:"white" }}>Home</NavLink></li>
  <li><NavLink to=""  style={{ textDecoration: 'none',color:"white"  }}>Our Services</NavLink></li>
  <li><NavLink to="/contact"  style={{ textDecoration: 'none',color:"white"  }}>Feedback</NavLink></li>
  <li><NavLink to="/DoctorsDashboard"  style={{ textDecoration: 'none',color:"white"  }}>Dashboard</NavLink></li>
  <li><NavLink to="/PatientAppointmentList" style={{ textDecoration: 'none',color:"white"  }}>Appointment List</NavLink></li>
  </ul>
  </div>
  </div>
  <div className="right"></div>
      </div>
    </div></>
    
  }else{
return <>
  <div className="navbar">
  <div className="navimg"><img src="" width="200px" height="80px"/></div>
  <div className="headerpage"><ul><li><NavLink to="/Doctorshome"  style={{ textDecoration: 'none' ,color:"black" }}></NavLink></li>
        <li><NavLink to=""  style={{ textDecoration: 'none',color:"black"  }}></NavLink></li>
        <li><NavLink to="/contact"  style={{ textDecoration: 'none',color:"black"  }}></NavLink></li>
        <li><NavLink to="/Dashboard"  style={{ textDecoration: 'none',color:"black"  }}></NavLink></li>
       </ul></div>
       <div className="navContainer">
    <div className="navItem"><NavLink to="/DoctorsLogin"  style={{ textDecoration: 'none',color:"white" }}>Sign In </NavLink>
   </div>
    
    </div>
    <div className="span1">
    <input type="checkbox"/>
<div className="left">

<div className="menu">
<ul>
<li>Home</li>
<li>About</li>
<li>Gallery</li>
<li>Vision</li>
<li>Contact</li>
</ul>
</div>
</div>
<div className="right"></div>
    </div>
  </div></>}
  
}

export default Navbar;
