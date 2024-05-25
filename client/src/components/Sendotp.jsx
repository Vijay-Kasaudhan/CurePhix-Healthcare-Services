import React from 'react'

const Sendotp = (props) => {
    const { value, handleChange,hashHandleChange} = props;
    const{phone}=value;
    const postdata=async(e)=>{
e.preventDefault();
      let res=await fetch("/api/users/sendotp",{
            
        method:"POST",
        headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({phone})
         })
        const data=await res.json();
        hashHandleChange(data.fullHash);
        console.log(data);
        if(res.status===404){
        window.alert("check the phone no");
    }else{
      props.nextStep();
    window.alert("otp generated")
    }
    }
  return (
    <>
       <section>
    <form method='POST' onSubmit={postdata}>
        <div className="phonenumberinput">
            <input type="" placeholder='phone' onChange={handleChange('phone')}/>
        </div>
        <div className="sendotpbutton"><button type="submit">Send Otp</button></div>
    </form>
    </section>
    </>
  )
}

export default Sendotp
