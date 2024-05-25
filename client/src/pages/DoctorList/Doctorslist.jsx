import React from 'react';
import Searchlist from '../../components/searchlist/Searchlist';
import { useFilterContext } from "../../context/filter_context.js";
import Header1 from "../../components/header1/Header1"
import Navbar from "../../components/navbar/Navbar";
import FilterSection from '../../components/filtersection/filtersection.js';
const Doctorslist = () => {
  const {filter_doctors}=useFilterContext();
  if(filter_doctors){
    console.log(true);
  }
  return (<>
  <Navbar/>
  <Header1/>
<FilterSection />
         
      <div>
      {filter_doctors.map((curelem)=>{
        return <Searchlist key={curelem._id} {...curelem}/>
      })}
     </div>
      </>
  )
}

export default Doctorslist;
 