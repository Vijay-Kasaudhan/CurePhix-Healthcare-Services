import React from 'react'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {GoSearch} from 'react-icons/go';
import {MdLocationPin} from 'react-icons/md';
import { useFilterContext } from "../../context/filter_context";


import "./Header.css";
const Header1 = () => {
  const {
    filters: {doctorname,city},
    updateFilterValue,
    all_doctors,
  } = useFilterContext();

  const getUniqueCity = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });
    return (newVal = ["All City",...new Set(newVal)]);
  };
  const cityData = getUniqueCity(all_doctors, "city");
  return (
  <><div className="header1">
  <span className='span1' style={{fontFamily:"'Anybody', cursive"}}>Now Book Appointment from Anywhere & Anytime</span>
  <h3 style={{fontFamily:"'Open Sans', sans-serif",marginTop:"-20px"}}>Get rid of long queues and save your time</h3>
  <div className="searchbar">
  <MdLocationPin style={{fontSize:"25px",marginLeft:"7px",marginTop:"7px"}}/>
  <select id="cars" name="city" onClick={updateFilterValue} required>
  <option value="" disabled selected hidden>City</option>
  {cityData.map((curElem,index)=>{
      return<><option  key={index} name="city" value={curElem}> {curElem} </option>
      <label htmlFor="">{curElem}</label><br/></>
     })}
 </select>
 </div>
 < div className="searchcontainer">
 <GoSearch style={{fontSize:"25px",marginLeft:"7px",marginTop:"7px"}}/>
 <input type="text" name="doctorname" placeholder='Search Doctors , Hospitals etc'onChange={updateFilterValue}/>
 </div>
<div className="button">
<NavLink to="/List"> <button className='searchbutton' ><span>Search</span></button></NavLink>
</div>
</div></>
  )
}

export default Header1;
