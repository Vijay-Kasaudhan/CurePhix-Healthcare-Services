import {BiFilterAlt} from 'react-icons/bi';
import { useFilterContext } from "../../context/filter_context";

import "./filtersection.css";
const FilterSection = () => {
  const myStyle={
    backgroundImage: 
"url('https://th.bing.com/th/id/R.179ee91f9eb6ba43e328687f15fb1c24?rik=pGhwuYoWCbfr3g&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2ficonsmind%2foutline%2f512%2fFilter-2-icon.png&ehk=QD%2fmdm09c9JbK84y9BE9Lb5yXqkvXpFaQU9JUI0Uc4g%3d&risl=&pid=ImgRaw&r=0')"}
  const {
    filters: { specialization,gender,experience },
    updateFilterValue,
    all_doctors,
  } = useFilterContext();

  // get the unique values of each property
  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });
    return (newVal = [...new Set(newVal)]);
  };
  const getUniqueGender = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });
    return (newVal = ["All Gender", ...new Set(newVal)]);
  };

 
  const specializationData = getUniqueData(all_doctors, "Specialization");
  const genderData = getUniqueGender(all_doctors, "Gender");
  const experienceData = getUniqueData(all_doctors, "Experience");
  
 

  return (
    <>
     <div className="filter">
     <div className="filter-specialization">
        <h3>Specilization</h3><br/>
        <div>
          {specializationData.map((curElem, index) => {
            return <><input
            key={index}
            type="radio"
            name="specialization"
            value={curElem}
            className="specializationinput"
            onChange={updateFilterValue}/>
            <label>{curElem}</label><br/>
          </>
              
            ;
          })}
        </div>
      </div><br/>
  <div className="filter-gender">
  <h3>Gender</h3><br/>
  <div>
     {genderData.map((curElem,index)=>{
      return<><input type="radio" key={index} name="gender" value={curElem} onChange={updateFilterValue}/>
      <label htmlFor="">{curElem}</label><br/></>
    })}
  </div>
  </div><br/>

  <div className="filter-experience">
  
  <div>
    <select name="experience" className='Experienceselect' onChange={updateFilterValue} required>
    <option value=""  disabled selected hidden style={{fontSize:"22px"}}>Experience</option>
    {experienceData.map((curElem,index)=>{
      return<><option  key={index} name="experience" value={curElem}> {curElem} Years</option>
      <label htmlFor="">{curElem}</label><br/></>
     })}
    </select>
  </div>
  </div><br/>
  <div className="filter-fees">
    <h3>Fees</h3><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="200" />
    <label>200</label><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="500"/>
    <label> 500</label><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="800"/>
    <label> 800</label><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="1000"/>
    <label>1000</label><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="2000"/>
    <label>2000</label><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="2000"/>
    <label> above 2000</label><br/>
  </div>

      </div>
      <div className="span2">
       <input type="checkbox" /> 
    <div className="left1">
<div className="menu1">
<div className="filter-specialization">
        <h3>Specilization</h3><br/>
        <div>
          {specializationData.map((curElem, index) => {
            return <><input
            key={index}
            type="radio"
            name="specialization"
            value={curElem}
            className="specializationinput"
            onChange={updateFilterValue}/>
            <label>{curElem}</label><br/>
          </>
              
            ;
          })}
        </div>
      </div><br/>
  <div className="filter-gender">
  <h3>Gender</h3><br/>
  <div>
     {genderData.map((curElem,index)=>{
      return<><input type="radio" key={index} name="gender" value={curElem} onChange={updateFilterValue}/>
      <label htmlFor="">{curElem}</label><br/></>
    })}
  </div>
  </div><br/>

  <div className="filter-experience">
  
  <div>
    <select name="experience" className='Experienceselect' onChange={updateFilterValue} required>
    <option value=""  disabled selected hidden>Experience</option>
    {experienceData.map((curElem,index)=>{
      return<><option  key={index} name="experience" value={curElem}> {curElem} Years</option>
      <label htmlFor="">{curElem}</label><br/></>
     })}
    </select>
  </div>
  </div><br/>
  <div className="filter-fees">
    <h3>Fees</h3><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="200" />
    <label>200</label><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="500"/>
    <label> 500</label><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="800"/>
    <label> 800</label><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="1000"/>
    <label>1000</label><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="2000"/>
    <label>2000</label><br/>
    <input type="radio" onChange={updateFilterValue} name="fees" value="2000"/>
    <label> above 2000</label><br/>
    </div>
</div>
</div>
<div className="right1"></div>
    </div>
  
</>
  );
};

export default FilterSection;