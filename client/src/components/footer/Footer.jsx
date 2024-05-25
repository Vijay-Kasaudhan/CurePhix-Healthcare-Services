import React from "react";
import "./Footer.css";
import {NavLink} from "react-router-dom";
import logo from "../../image/CurePhix-01.png";
// import img from "../../image/logo2.png";
import {IoLogoFacebook} from "react-icons/io";
const Footer = () => {
  return (
    <div className="Footer">
        <div className="footerlogo"> <img src={logo} width="230px" height="130px" style={{marginTop:"20px",marginLeft:"-5px"}} alt="companylogo"/>
       <span style={{color:"white"}}>'CurePhix' is a digital HealthCare startup .It connects patients with the doctors , clinics and hospitals .
We are continuously working towards making healthcare simpler and smarter .</span>

</div>
      <div className="QuickLinks">
        <h3 style={{color:"white"}}>Quick Links</h3>
        <ul><li style={{marginTop:"20px"}}><NavLink  style={{color:"white",textDecoration:"none"}} to="">Home</NavLink></li>
        <li style={{marginTop:"10px"}}><NavLink style={{color:"white",textDecoration:"none"}} to="">Our Services</NavLink></li>
        <li style={{marginTop:"10px"}}><NavLink style={{color:"white",textDecoration:"none"}} to="">Feedback</NavLink></li>
        <li style={{marginTop:"10px"}}><NavLink style={{color:"white",textDecoration:"none"}} to=""></NavLink></li></ul>
      </div>
      <div className="More">
      <h3 style={{color:"white"}}>Terms of &nbsp;Use</h3>
        <ul><li style={{marginTop:"20px"}}><NavLink  style={{color:"white",textDecoration:"none"}} to="">Terms & Conditions</NavLink></li>
        <li style={{marginTop:"10px"}}><NavLink style={{color:"white",textDecoration:"none"}} to="">Privacy Policy</NavLink></li>
        </ul>
      </div>
      <div className="CompanyContact">
        <h3 style={{color:"white",marginBottom:"20px"}}>Contact</h3>
        <span style={{color:"white",marginTop:"30px"}}>T-16 P11 Khirighat Near St Basil School Basti</span>
        <div className="SocialMedia"><img src="https://th.bing.com/th?q=Facebook+Button+No+Background&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" width="30px" height="30px" style={{background:"black"}}/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1025px-Instagram-Icon.png" weight="30px" height="30px"/>
    <img src="https://th.bing.com/th/id/OIP.Ef7QC6yV_mBZd2qcP1N1HwHaFu?w=249&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7" weight="30px" height="30px" />
    </div>
      </div>
    
      <div className="CopyRight"><h4 style={{color:"white",marginTop:"60px",marginLeft:"30px"}}>2023 @ Copyright</h4></div>
    </div>
  );
};

export default Footer;