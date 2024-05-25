import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Registration from './pages/registration/Registration.jsx';
import Login from './pages/login/Login';
import Booking from './components/bookingappointment/Booking';
import AboutUs from './pages/About/AboutUs';
import Doctorslist from './pages/DoctorList/Doctorslist';
import Contact from './pages/Contact/Contact';
import AppointmentList from './pages/AppointmentList/AppointmentList';

import {Doctorcontext } from "./context/Doctorcontext.js";
import SingleDoctor from './pages/singledoctor/SingleDoctor';
import PaymentSuccess from './pages/PaymentSuccessfull';
import { FilterContextProvider } from './context/filter_context';
import {Appointmentcontextuser} from "./context/Appointmentcontextuser";
import { Appointmentcontextdoctor } from './context/Appointmentcontextdoctor';
import Logout from './pages/Logout/Logout';
import Dashboard from './pages/dashboard/Dashboard';
import Forgetpassword from './pages/ForgetPassword/ForgetPassword';

import Home1 from './DoctorPage/Home/Home';
import DoctorLogin from "./DoctorPage/Login/Login";
import DoctorRegistration from "./DoctorPage/Registration/Registration";
import DoctorApi from "./DoctorPage/DoctorApi/DoctorApi";
import DoctorLogout from "./DoctorPage/Logout/Logout";
import DoctorForgetpassword from "./DoctorPage/forgetpassword/ForgetPassword";
import PatientAppointmentList from "./DoctorPage/AppointmentLists/AppointmentLists";
import DoctorDashboard from "./DoctorPage/Dashboard/Dashboard";
import AdminLogin from "./Admin/Adminlogin/AdminLogin";
import { useState,useEffect } from 'react';
;
const App=()=>{
  const[doc,setdoc]=useState(true);
  const hg=()=>{
    if(localStorage.getItem("doctorToken")){
      setdoc(false);
    }
  }

  useEffect(()=>{
    hg();
},[])
  return(<>
 
  <Doctorcontext>
    <FilterContextProvider>
    <Appointmentcontextuser>
      <Appointmentcontextdoctor>
    <BrowserRouter>
    <Routes>
      {doc===true&&<Route path="/" element={<Home/>}/>}
      {doc===false&& <Route path="/" element={<Home1/>}/>}
   
    <Route path="home" element={<Home/>}/>
    <Route path="About" element={<AboutUs/>}/>
    <Route path="Registration" element={<Registration/>}/>
    <Route path='Login' element={<Login/>}/>
    <Route path="Booking/:id" element={<Booking/>}/>
    <Route path="Dashboard" element={<Dashboard/>}/>
    <Route path="contact" element={<Contact/>}/>
    <Route path="AppointmentList" element={<AppointmentList/>}/>
    <Route path="PatientAppointmentList" element={<PatientAppointmentList/>}/>
    <Route path="List"  element={<Doctorslist/>}/>
    <Route path='SingleDoctor/:id' element={<SingleDoctor/>}/>
    <Route path="LogOut" element={<Logout/>}/>
    <Route path='DoctorsHome' element={<Home1/>}/>
    <Route path="DoctorApipost" element={<DoctorApi/>}/>
    <Route path='DoctorsLogin' element={<DoctorLogin/>}/>
    <Route path='DoctorsRegistration' element={<DoctorRegistration/>}/>
    <Route path='DoctorsLogout' element={<DoctorLogout/>}/>
    <Route path='DoctorsDashboard' element={<DoctorDashboard/>}/>
    <Route path="forgetpassword" element={<Forgetpassword/>}/>
    <Route path="doctorforgetpassword" element={<DoctorForgetpassword/>}/>
    <Route path="paymentsuccess" element={<PaymentSuccess />} />
    <Route path="AdminLogin" element={<AdminLogin/>} exact/>
    </Routes>
    </BrowserRouter>
    </Appointmentcontextdoctor>
    </Appointmentcontextuser>
    </FilterContextProvider>
    </Doctorcontext>
    
    </> );
  
}

export default App;
