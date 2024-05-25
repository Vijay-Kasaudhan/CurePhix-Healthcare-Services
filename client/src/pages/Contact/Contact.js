import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from "../../components/footer/Footer";
import "./Contact.css";

const Contact = () => {
  return (
    <>
    <Navbar/>
    <div className="feedbackcontainer">
      <span className='feedbackspan' style={{color:"white",fontFamily:"'Anybody', cursive"}}>We Love To Hear From You</span><br/>
      <h5 className='feedbackh5'>Help us to Improve Our Services , your Feedback mean a lot to us </h5>
      <div className="feedbackinputsection">
      <form action='https://formspree.io/f/mwkzavdb' method='POST'>
        
          <textarea  name='feedback'  placeholder='Write Your Feedback' />
        <button type='submit' className='feedbacksubmit'>Submit</button>
      </form>
    </div>
    </div>
    <Footer/>
   </>
  )
}

export default Contact
