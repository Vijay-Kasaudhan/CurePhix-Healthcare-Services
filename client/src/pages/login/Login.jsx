import React ,{useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import { useNavigate,useHistory } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar';
import  {FiEye } from 'react-icons/fi'; 
import  {FiEyeOff } from 'react-icons/fi'; 
import logo from "../../image/CurePhix-01.png";
import "./Login.css";
const Login = () => {
    

    const[success,setsuccess]=useState("");
    const[showpassword,setshowpassword]=useState(false);
    const[password,setpassword]=useState("");
    const[phone,setphone]=useState("");
    const navigate=useNavigate();
   
    const check=()=>{if(localStorage.getItem("jwToken")){
      navigate("/home")
     }else if(localStorage.getItem("doctorToken1")){
      navigate("/DoctorsHome")
     }}
    
    const postdata= async (e)=>{
        e.preventDefault();
       
        let res=await fetch("/api/users/Login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({phone,password})
             })
            const data=await res.json();
            if(res.status===404||!data){
            window.alert("invalid credentials");
            setsuccess("false")
           }else{
          setsuccess("true");
          localStorage.setItem("jwToken",data.token);
          
         
          navigate("/home")
          }}

          const togglePasswordVisibility = () => {
            setshowpassword(!showpassword);
          };



useEffect(()=>{
  check()
},[])


    return (
        <>
            <Navbar  /> 

           {success==="true" && <h1 style={{background:"green",color:"white"}}>Successfully LOgin</h1>}
           {success==="false" && <h1 style={{background:"red",color:"white"}}>Problem occured <button onClick={()=>{setsuccess("")}}>close</button></h1>}
           <section>
            
      <div className="UserLoginpage">
      <img src={logo}/>
      <form method='POST' onSubmit={postdata}>
       
        <div className=" Userinput-field">
        <span>Phone No</span>
       <input type="text" on placeholder="" autoComplete="off"  min="10" max="10" onChange={(e) => { setphone(e.target.value) }} style={{padding:"10px"}} />

      </div>
      <div className="Userinput-field1">
      <span>Password</span>
          <input type={showpassword ?"text" :"password"} on placeholder="" autoComplete="off" min="10" max="10"onChange={(e) => { setpassword(e.target.value) }} style={{padding:"10px"}} />
        
        {showpassword ? (
    <FiEyeOff onClick={togglePasswordVisibility} style={{position:"absolute",top:"55%",left:"90%"}} />
  ) : (
    <FiEye onClick={togglePasswordVisibility} style={{position:"absolute",top:"55%",left:"90%"}}/>
  )}
      </div>
     
      
      <button>Sign In</button>
      
      
</form>
<div className="forgetpassword"><h5><NavLink to="/forgetpassword">Forgot Password</NavLink></h5></div>
<div className="Userregestrationformlink">
    <span>Don't have an account ? <NavLink to="/Registration" className="link signup-link">Signup</NavLink></span>
   
    </div>
      
      </div>
    
    </section>
   
            <Footer />
        </>
    )
}

export default Login;
