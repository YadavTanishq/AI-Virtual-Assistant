import React, { useContext } from 'react'
import { UserDataContext } from '../context/Usercontext'
function Card  ({image}) {
  const {serverurl,userdata,setuserdata,backendimage,setbackendimage,frontendimage,setfrontendimage,selectedimage,setselectedimage}=useContext(UserDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030323] border-2 border-[#0000ffaf] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${selectedimage==image?"border-4 border-white shadow-2xl shadow-blue-950 ":null}`} onClick={()=>{
      setselectedimage(image)
      setbackendimage(null)
      setfrontendimage(null)

    }}>
        <img src={image} className='h-full object-cover' />
    
    </div>
  )
}

export default Card