import React from 'react'

const Verifyotp = (props) => {
  const {  handleChange} = props;
  const back=(e)=>{
    e.preventDefault();
    props.prevStep();
  }
  const next=(e)=>{
    e.preventDefault();
    props.nextStep();
  }
  
  return (
    <>
      <section>
        <form>
            <div className="otp"><input type="text" onChange={handleChange('otp')}/></div>
            <div className="next"><button onClick={next} >Next</button></div>
            <div className="prev"><button  onClick={back}>Back</button></div>
        </form>
      </section>
    </>
  )
}

export default Verifyotp
