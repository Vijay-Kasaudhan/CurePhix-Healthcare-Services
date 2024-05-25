import React from 'react';

import logo from "../../image/CurePhix-01.png";
import "./navbar.css";
import {NavLink} from "react-router-dom";

const Navbar = () => {
  
  if(localStorage.getItem("jwToken")){
    return <> <div className="navbar1">
    <div className="navimg"><img className='navImage' src={logo} width="256px" height="80px" alt="companylogo"/></div>
    <div className="headerpage"><ul><li><NavLink to="/home"  style={{ textDecoration: 'none' ,color:"black" }}>Home</NavLink></li>
          
          <li><NavLink to="/contact"  style={{ textDecoration: 'none',color:"black"  }}>Feedback</NavLink></li>
         
          <li><NavLink to="/Dashboard"  style={{ textDecoration: 'none',color:"black"  }}>Dashboard</NavLink></li></ul></div>
          <div className="doctorr">
    
            
          </div>
          <div className="doctorr">
          <span><NavLink to="/AppointmentList" style={{ textDecoration: 'none',color:"black"  }}>Appointment List</NavLink></span>
           </div>
       
     
      <div className="navItem"><NavLink to="/LogOut"  style={{ textDecoration: 'none',color:"white" }}>Logout</NavLink>
     </div>
      
  
      <div>
        
      <input type="checkbox"/>
  <div className="menuleft">
  
  <div className="menu">
  <ul>
  <li><NavLink to="/home"  style={{ textDecoration: 'none' ,color:"white" }}>Home</NavLink></li>
  <li><NavLink to=""  style={{ textDecoration: 'none',color:"white"  }}>Our Services</NavLink></li>
  <li><NavLink to="/contact"  style={{ textDecoration: 'none',color:"white"  }}>Feedback</NavLink></li>
  <li><NavLink to="/Dashboard"  style={{ textDecoration: 'none',color:"white"  }}>Dashboard</NavLink></li>
  <li><NavLink to="/AppointmentList" style={{ textDecoration: 'none',color:"white"  }}>Appointment List</NavLink></li>
  </ul>
  </div>
  </div>
  
      </div>
    </div></>
    
  }else{
return <>
  <div className="navbar1">
  <div className="navimg"><img className="navImage" src={logo} width="186px" height="100px" alt="companylogo"/></div>
  <div className="headerpage"><ul><li><NavLink to="/home"  style={{ textDecoration: 'none' ,color:"black" }}>Home</NavLink></li>
        <li><NavLink to=""  style={{ textDecoration: 'none',color:"black"  }}>Our Services</NavLink></li>
        <li><NavLink to="/contact"  style={{ textDecoration: 'none',color:"black"  }}>Feedback</NavLink></li>
        
      
       </ul></div>
        <div className="doctorr">
          <span><NavLink to="/DoctorsLogin" style={{ textDecoration: 'none',color:"black"  }}>For Doctors</NavLink></span>
           </div>
     <div className="navItem"><NavLink to="/Login" style={{ textDecoration: 'none',color:"white"  }}>Sign In</NavLink></div>
    
    <div className="span1">
    <input type="checkbox" className='check'/>
<div className="menuleft">

<div className="menu">
 
<ul>
<li><NavLink to="/home"  style={{ textDecoration: 'none' ,color:"white" }}>Home</NavLink></li>
<li><NavLink to=""  style={{ textDecoration: 'none',color:"white"  }}>Our Services</NavLink></li>
<li><NavLink to="/contact"  style={{ textDecoration: 'none',color:"white"  }}>Feedback</NavLink></li>
<li><NavLink to="/DoctorsLogin" style={{ textDecoration: 'none',color:"white"  }}>For Doctors</NavLink></li>
<li><NavLink to="/Registration" style={{ textDecoration: 'none',color:"white"  }}>Sign Up</NavLink></li>
</ul>
</div>
</div>

    </div>
  </div></>}
  
}

export default Navbar;
