import React, { useState } from 'react'
// import Footer from '../../components/footer/Footer'
import Navbar from '../../DoctorComponent/Navbar/Navbar'

import { NavLink } from 'react-router-dom';
import Footer from "../../DoctorComponent/Footer/Footer";
import Contact from '../../components/contact/Contact';
import "./Home.css"

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
 
const steps = [
    {
        id: '0',
        message: 'Hey Geek!',
 
        // This calls the next id
        // i.e. id 1 in this case
        trigger: '1',
    }, {
        id: '1',
 
        // This message appears in
        // the bot chat bubble
        message: 'Please write your username',
        trigger: '2'
    }, {
        id: '2',
 
        // Here we want the user
        // to enter input
        user: true,
        trigger: '3',
    }, {
        id: '3',
        message: " hi {previousValue}, how can I help you?",
        trigger: 4
    }, {
        id: '4',
        options: [
             
            // When we need to show a number of
            // options to choose we create alist
            // like this
            { value: 1, label: 'Booking Related issue' },
            { value: 2, label: 'Other Issue' },
 
        ],trigger: 5},
        {
          id: '5',
          message: " hi {previousValue}, how can I help you?",
          
          trigger: 6
      },
      
      {
        id: '6',
        message: " hi {previousValue}, how can I help you?",
        
        end:true
    }
    
];
 
// Creating our own theme
const theme = {
    background: "#18eff",
    headerBgColor: '#1E8EE5',
    headerFontSize: '20px',
    botBubbleColor: '#1E8EE5',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
};
 
// Set some properties of the bot
const config = {
    botAvatar: "img.png",
    floating: true,
};
const Home = () => {
    const[step,setstep]=useState(false);
const[status,setstatus]=useState("")
const[Apiupdate,setApiupdate]=useState({fees:"",slot1time:"",slot2time:"",day1:"",day2:"",day3:"",day4:"",day5:"",day6:"",day7:""})
const email=localStorage.getItem("doctoremail");
 const poststatus=async ()=>{
    let res=await fetch("/api/doctors/updatestatus",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email,status})
         })
        const data=await res.json();
        if(res.status===400||!data){
        window.alert("invalid credentials");
       }else{
         window.alert("Status Successfully Updated")
     }
 }

 const handlechange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setApiupdate((prev)=>({...prev,[name]:value}))
    }

    const Postupdateddata=async(e)=>{
        e.preventDefault();
        const{fees,slot1time,slot2time,day1,day2,day3,day4,day5,day6,day7}=Apiupdate;
        let res = await fetch("/api/doctors/updatedoctorapi",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({fees,slot1time,slot2time,email,day1,day2,day3,day4,day5,day6,day7})
           })
    
           const data=await res.json();
             
             if(res.status===404){
                   window.alert(data.message);
                  
                 }else{window.alert("successfull")
                 setstep(false);
                }
                
    }
  return (
    <>
    <Navbar/>
    <div className='Welcome'><p>Welcome to your Online Clinic</p>
    <img  src='data:image/jpeg;base64,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' alt='Doctorimage'/>
    <span>Dr Satyarth Singh</span>
    </div>
    
   <div className="Doctoroption">
    <span>Hide your portfolio when unavilable at clinic by choosing "Closed" option and Unhide your Portfolio
        when you are again available at clinic by choosing "Open" option and after choosing option clock on "update buttpn."
    </span>
    <div className="inputs">
   
    <input type='radio' name='ss'value="Open" onChange={(e)=>{setstatus(e.target.value)}}/>
    <label>Open</label>
    </div>
    <div className="inputs" > 
    <input type='radio' name='ss' value="Closed"  onChange={(e)=>{setstatus(e.target.value)}}/>
    <label>Closed</label>
    <button className='statusupdatebtn' onClick={poststatus}>Update</button>
    </div>
   
   </div>
   <div className="DoctorApiupdates">
   <span>Update Details which are reflected to the Patient.</span>
   <button onClick={()=>{setstep(true)}}>Click to update</button>
   </div>
   <div className={step?"DoctorApiupdate":"DoctorApiupdatess"}>
        <div className="DoctorApiupdateContainer">
        <form onSubmit={Postupdateddata}  method="POST">
          
        <div className="DoctorApiupdateinput">
        <h3>Fees</h3>
            <input type="text" name='fees' onChange={handlechange} />
        </div>
        <div className="DoctorApiupdateinput">
            <h3>Slot1 Time</h3>
            <input type="text" name='slot1time' onChange={handlechange} placeholder=''/>
        </div>
        <div className="DoctorApiupdateinput">
            <h3>Slot2 Time</h3>
            <input type="text" name='slot2time' onChange={handlechange} placeholder=''/>
        </div>
        <div className="DoctorApiupdateinputday">
            <h3>Appointment Day</h3>
           <span>
            <input type="radio" name='day1' onChange={handlechange} placeholder=''/>
            <label>Sunday</label></span>
            <span>
            <input type="radio" name='day2' onChange={handlechange} placeholder=''/>
            <label>Monday</label></span>
            <span>
            <input type="radio" name='day3' onChange={handlechange} placeholder=''/>
            <label>Tuesday</label></span>
            <span>
            <input type="radio" name='day4' onChange={handlechange} placeholder=''/>
            <label>Wednesday</label></span>
            <span>
            <input type="radio" name='day5' onChange={handlechange} placeholder=''/>
            <label>Thursday</label></span>
            <span>
            <input type="radio" name='day6' onChange={handlechange} placeholder=''/>
            <label>Friday</label></span>
            <span>
            <input type="radio" name='day7' onChange={handlechange} placeholder=''/>
            <label>Saturday</label></span>
           
        </div>
        <button className='SubmitButton' type='submit'>Submit</button>
        <button className='CancelButton' type='button' onClick={()=>{setstep(false)}}>Cancel</button>
        </form>
        </div>
        </div>
   
    
    {/* <div className="App">
            <ThemeProvider theme={theme}>
                <ChatBot
 
                    // This appears as the header
                    // text for the chat bot
                    headerTitle="Curephix"
                    steps={steps}
                    {...config}
 
                />
            </ThemeProvider>
        </div> */}
        <Contact/>
        <Footer/>
    </>
  )
}

export default Home;
