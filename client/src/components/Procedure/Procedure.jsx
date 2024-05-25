import React from 'react'
import "./procedure.css"
function Procedure() {
  return (
    <div className='Procedurecontainer'>
      <div className="step step1">
        <img src="https://th.bing.com/th/id/R.0b9d8ea9f4428ebfad303cdf96b0ab65?rik=iBumBmnKplcvLg&riu=http%3a%2f%2fdribbble.s3.amazonaws.com%2fusers%2f97705%2fscreenshots%2f797988%2fsearchbar.png&ehk=f6GP1YPpXwl%2bKLQ36V41J4J%2b5DGYnG1%2b9MnZIt8LcDs%3d&risl=&pid=ImgRaw&r=0" width="100px" alt='search'/>
     <span>Search a "" as per u r requirment using filters if neccessary</span>
      </div>
      <div className="step step2">
        <img src='' alt=''/>
      <span>Book your "" or view the  data to get more information regarding "" and then book.But before booking u should be login on the platform.</span>
      </div>
      
      <div className="step step3">
        <span>Fill the required data and pay rs " " as platform charge and remaing ammount at time of visiting "" and a booking confirmaton sms will be send on registered  phone number </span>
      </div>
      <button>Find a Doctor </button>
    </div>
  )
}

export default Procedure
