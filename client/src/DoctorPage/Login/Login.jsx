import React ,{useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import { useNavigate } from "react-router-dom";
import Navbar from '../../DoctorComponent/Navbar/Navbar';
import  {FiEye } from 'react-icons/fi'; 
import  {FiEyeOff } from 'react-icons/fi'; 
import logo from "../../image/CurePhix-01.png";
import "./Login.css";
const Login = () => {
    const[showpassword,setshowpassword]=useState(false);
    const[password,setpassword]=useState("");
    const[phone,setphone]=useState("");
    const navigate=useNavigate();
    const check=()=>{ if(localStorage.getItem("doctorToken")){
      navigate("/DoctorsHome")
     }}
    
    const postdata= async (e)=>{
     e.preventDefault();
     let res=await fetch("/api/doctors/Login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({phone,password})
             })
            const data=await res.json();
            if(res.status===400||!data){
            window.alert("invalid credentials");
           }else{
         localStorage.setItem("doctorToken",data.token)
          navigate("/Doctorshome")
         }
        }

        const togglePasswordVisibility = () => {
            setshowpassword(!showpassword);
          };
          useEffect(()=>{
            check();
          },[])

    return (
        <>
            <Navbar /> 
            <div className="doctorloginpage"><span style={{fontFamily:"'Anybody', cursive"}}>Welcome to Doctor's Login page.</span></div>
            <section>
      <div className="Loginpage">
        <img src={logo}/>
      <form method='POST' onSubmit={postdata}>
      <div className=" input-field">
        <span>Phone No</span>
       <input type="text" on placeholder="" autoComplete="off"  min="10" max="10" onChange={(e) => { setphone(e.target.value) }} />

      </div>
      <div className="input-field1">
      <span>Password</span>
          <input type={showpassword ?"text" :"password"} on placeholder="" autoComplete="off" min="10" max="10"onChange={(e) => { setpassword(e.target.value) }} />
          {showpassword ? (
    <FiEyeOff onClick={togglePasswordVisibility} style={{position:"absolute",top:"55%",left:"90%"}} />
  ) : (
    <FiEye onClick={togglePasswordVisibility} style={{position:"absolute",top:"55%",left:"90%"}}/>
  )}
      </div>
      <button>Sign In</button>
</form>
<div className="doctorforgetpassword"><h5><NavLink to="/forgetpassword">Forgot Password</NavLink></h5></div>
    <div className="regestrationformlink">
    <span>Don't have an account ? <NavLink to="/DoctorsRegistration" className="link signup-link">Signup</NavLink></span>
   
    </div>
      </div>
    
    </section>
   
            <Footer />
        </>
    )
}

export default Login;
