import React from 'react'
import "./Contact.css";
const Contact = () => {
  return (
    <div className='contactformcontainer'>
      <h3>Contact</h3>
      <div className="contactform"><span>Name</span><input type="text"/></div>
      <div className="contactform"><span>Phone No</span><input type="text"/></div>
      <div className="contactform"><span>Email</span><input type="email"/></div>
      <div className="contactform"><span>Message</span><textarea type="text"/></div>
      <button>Submit</button>
    </div>
  )
}

export default Contact
