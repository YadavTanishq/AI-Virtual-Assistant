import React from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import { useContext } from 'react'
import { useState } from 'react'
import { UserDataContext } from '../context/Usercontext'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const Customize2 = () => {
  const {userdata,backendimage,serverurl,selectedimage,setuserdata}=useContext(UserDataContext)
  const [assistantname,setassistantname]=useState(userdata?.assistantname || "")
  const [loading,setloading]=useState(false)
  const navigate =useNavigate()

 const handleupdateassistant= async ()=>{
  setloading(true)
  try{
    let formData=new FormData()
    formData.append("assistantname",assistantname)
    if(backendimage){
      formData.append("assistantimage",backendimage)
    }else{
      formData.append("imageUrl",selectedimage)
    }
    const result=await axios.post(`${serverurl}/api/user/update`,formData,{withCredentials:true})
    setloading(false)
    console.log(result.data)
   setuserdata(result.data)
   navigate("/")
  } catch(error){
    setloading(false)
    console.log(error)
  }
 }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col relative'>

      <IoArrowBackSharp className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>{
        navigate("/customize")
      }}/>
      <h1 className='text-white mb-[40px] text-[30px] text-center p-[20px] gap-[20px]'>Enter your  <span className='text-blue-200'>Assistant Name</span></h1>
     <input type="text" placeholder='Enter Assistant Name' className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setassistantname(e.target.value)} value={assistantname}/>
     {assistantname &&  <button className='min-w-[250px] h-[60px] text-black bg-white font-semibold rounded-full text-[19px] cursor-pointer mt-[20px]' disabled={loading} onClick={()=>{
      handleupdateassistant()
     }
     }>{!loading?"Create your Assistant":"loading..."}</button>
}
    </div>
  )
}

export default Customize2