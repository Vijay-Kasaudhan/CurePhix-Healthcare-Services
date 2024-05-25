import React from 'react';
import { useState } from 'react';
import Contact from "../../components/contact/Contact";
import Navbar from "../../components/navbar/Navbar.jsx";
import Footer from '../../components/footer/Footer.jsx';
import Header1 from '../../components/header1/Header1.jsx';
import Specialisation from '../../components/specialization/specialisation.jsx';
import Procedure from '../../components/Procedure/Procedure';
import "./Home.css";
import img from "../../image/whatsapp.jpeg";


const Home = () => {
  
 
 
  return (
    <div>
      
      <Navbar/>
      
      <Header1/>
      
      <div className='Homecontent'><span style={{fontSize:"20px",fontWeight:"bolder",fontFamily:"'Anybody', cursive"}}>Now book your appointments easily with us Get treatment from best specialists of your City</span></div>
      <Procedure/>
      <div className="whatsappcontainer"><a href="https://chat.whatsapp.com/L8V6XBlWuZOKeGRGo0SEC9 " ><img src={img} width="60px" alt="whatsappimage"/></a></div>
      
      <Specialisation/>
    
     
    <Contact/>
      <Footer/>
     
    </div>
  )
}

export default Home;
