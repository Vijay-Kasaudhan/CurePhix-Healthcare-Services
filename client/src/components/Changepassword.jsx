import React from 'react'
import { useNavigate } from 'react-router-dom';

const Changepassword = (props) => {
  const { value, handleChange} = props;
  const navigate=useNavigate();
  const postdata=async(e)=>{
    const{phone,hash,otp,password,cpassword}=value;
    
    e.preventDefault();
          let res=await fetch("/api/users/verifyotp",{
                
            method:"POST",
            headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({phone,hash,otp,password,cpassword})
             })
            const data=await res.json();
          if(res.status===404){
            window.alert("check the phone no");
        }else{
         window.alert("password changed");
         navigate("/Login");
        }
        }
  return (
    <>
    <section>
        <form method='POST' onSubmit={postdata}>
            <div className="changepassword"><input type="text" name='password' onChange={handleChange('password')}/></div>
            <div className="changepassword"><input type="text" name="cpassword" onChange={handleChange('password')}/></div>
            <div className="next"><button type="submit">Change Password</button></div>
        </form>
      </section>
    </>
  )
}

export default Changepassword
