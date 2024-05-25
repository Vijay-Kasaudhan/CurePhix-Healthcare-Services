import React from 'react';
import "./Header.css";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="headerpage"><ul><li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="">AboutUs</NavLink></li>
        <li><NavLink to="">ContactUs</NavLink></li></ul></div>
      </div>
    </>
  )
}

export default Header;
