import { useEffect } from "react";
import Navbar from '../../components/navbar/Navbar';
import { useParams } from "react-router-dom";
import img from "../../image/PRINCE.jpg";
import { useDoctorContext } from "../../context/Doctorcontext.js";
import {Link, NavLink} from "react-router-dom";
import {FaRegThumbsUp} from 'react-icons/fa';
import {MdOutlineCancel} from 'react-icons/md';
import "./singledoctor.css";
import { useState } from "react";
// import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Footer from "../../components/footer/Footer";
const API = "http://localhost:8800/api/doctorlist/get/";


const SingleDoctor = () => {
  const[use,state]=useState({
    name:"",
    Reveiw:""
  })
  const[next,setnext]=useState(1);
  const { getSingleDoctor, isSingleLoading, singleDoctor } =
    useDoctorContext();

  const { id } = useParams();
  const[show,setshow]=useState(false);
const{id:alias,name,phone,timeam,timepm,address,description,qualification,Gender,specialization,experience,Reveiws,status}=singleDoctor;
const Booking_charge=45;
const checkstatus=()=>{
  if(status==="Closed"){
    setshow(true);
  }else{
    setshow(false)
  }
}

useEffect(()=>{
checkstatus();
},[])
const handleclick=(e)=>{
  let name=e.target.name;
  let value=e.target.value;
  state({...use,[name]:value})
}
    const postdata= async (e)=>{
       e.preventDefault();
       const{name,Reveiw}=use;
       
        let res=await fetch("/api/doctorlist/reveiw",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({id,name,Reveiw})
             })
        const data= await res.json();
        console.log(data);
        if(res.status===404||!data){
            window.alert("invalid credentials");
            console.log("invalid regestration");
            
          }else{window.alert("reveiw posted")
            setnext(1);
    

        }
        
    }
  useEffect(() => {
    getSingleDoctor(`${API}${id}`);
  }, []);

switch(next){ 
  case 1:

 return<><Navbar/>
 
<div className="doctorinfo">

  <div className="doctorimg"><img src={img} alt="Doctorimage" weight="100px" height="150px"/></div>
  <div className="doctorname"><h1>Dr. {name}</h1></div>
  <div className="sidoctorDescription">
      
      <span>Specialization : {specialization}</span>
      <span>Qualification : {qualification}</span>
      <span>
         Experience : {experience}
      </span>
     <span>Address : {address}</span>
     <span>Phone no. : {phone}</span>
     </div>
     <div className="siappointmentDays" > 
      <span>MON - SAT</span>
     <span  style={{color:"green"}}>Slot 1 : {timeam}</span>
     <span style={{color:"green"}}>Slot 2 : {timepm}</span>
     </div>
    
    

       <div className="sidoctorfee">
        <span>Appointment Fee : <span style={{color:"green"}}>Rs 500</span></span><br/><br/>
        <span>Booking Charge : <span style={{color:"green"}}>Rs {Booking_charge}</span></span><br/><br/>
        <span>Pay <span style={{color:"green"}}>Rs {Booking_charge} </span>online & Appointment Fee <span style={{color:"green"}}>Rs 500</span> at clinic</span><br/>
        <NavLink to={`/Booking/${id}`}>
        <button className="sidoctorCheckButton">Book &nbsp; Appointment</button>
        </NavLink>
       </div>
       <div className={show?"sistatuss":"sinstatuss"}><span style={{color:"black",padding:"20px"}}>Appointment cannot be scheduled for Dr{name}</span></div>
      
  
  
  <button className="ViewReveiw" onClick={()=>{setnext(3)}}> Review</button>
  <button className="WriteReveiw" onClick={()=>{setnext(2)}}>Write a Review...</button> 
  

  </div>
  
  <Footer/>
  </>

  case 2:
  return <>
  <Navbar/>
  

  <div className="Reveiw">
  <MdOutlineCancel style={{fontSize:"42px",marginLeft:"85%",marginTop:"20px"}} onClick={()=>{setnext(1)}}/>
    {/* <button className="reveiwcancel" onClick={()=>{setnext(1)}}></button> */}
  <form method="Post" onSubmit={postdata}>
    <div className="reveiwtext"><input type="name" name="name" placeholder="Name"  onChange={handleclick}/><br/><br/>    </div>
    <div className="reveiwtext">
    <textarea   name="Reveiw"  placeholder="Write a Review..." onChange={handleclick}/>  </div>
    <div className="reveiwsubmit"> <button type="Submit" >Post</button>
   </div>
   
 
  </form>

</div>
<Footer/>
</>
case 3:
  return <><Navbar/>
  <div className="Reveiwcontainer">
  <div className="ReveiwScroll">
{Reveiws.map((curvalue)=>{
  return <div className="reveiws" ><h3>{curvalue.name}</h3>
               <p>{curvalue.Reveiw}</p>
              
              </div>
})}

</div>
<button className="cancelbtn" onClick={()=>{setnext(1)}}>Back</button>
</div>
  
  </>

}
};
export default SingleDoctor;