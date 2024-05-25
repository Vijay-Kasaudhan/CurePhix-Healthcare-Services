import React from 'react'
import Feature from "../feature/Feature"
import "./specialization.css"
const specialisation = () => {
    const specialisation=[{specialisation:"General Physician",
  image:"https://th.bing.com/th/id/OIP.fXb_9ZwxqlB2LkVTxisrEQHaFj?w=264&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7"},{specialisation:"Peditrician",image:"https://th.bing.com/th/id/OIP.eDPLM6FBBUDOPKQrmNreOgHaFo?w=214&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},{specialisation:"Neurologist",image:"https://t4.ftcdn.net/jpg/01/04/17/09/500_F_104170960_LkXTA62KQfIr04AXA8MpxSDXrHOkoXgz.jpg"},{specialisation:"Dermatologist",image:"https://th.bing.com/th/id/OIP.svGBYNtP-kk8O0ejaKFnXgHaIM?pid=ImgDet&w=560&h=620&rs=1"}];
  return (
    <div className='Featuredcontainer'>
      {specialisation.map((data)=>{
        return <Feature specialisation={data}/>
      })}
    </div>
  )
}

export default specialisation
