import {React,useState} from 'react';
import "./Feature.css";
// import img from "../../image/download.jpg";
import { useFilterContext } from "../../context/filter_context";
import { NavLink } from 'react-router-dom';
const Feature = (prop) => {
  const[user,setuser]=useState();
  const {
   
    updateFilterValue,
    
  } = useFilterContext();

  
  return (<>
    < div className="featurecontainer">
      <div className="featuredcontainer1">
        <div className="image"><img src={prop.specialisation.image} width="120px" height="120px" alt="1"/></div>
        <div className="SpecializationName"><span>{prop.specialisation.specialisation}</span></div>
        <div className="button"><NavLink to="/List" style={{marginLeft:"38%",marginTop:"30px",fontSize:"32px"}}><button   onClick={updateFilterValue} value={prop.specialisation.specialisation} name="specialization" className='specializationbtn'>View</button></NavLink></div>
     </div>
     </div>
     </>
  )
}

export default Feature;
