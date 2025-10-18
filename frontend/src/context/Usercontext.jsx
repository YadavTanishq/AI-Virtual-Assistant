import React, { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
export const UserDataContext=createContext()
function Usercontext({children}) {
  const serverurl="http://localhost:5001"
   const [frontendimage,setfrontendimage]=useState(null)
    const [backendimage,setbackendimage]=useState(null)
  const [userdata,setuserdata]=useState(null)
  const [selectedimage,setselectedimage]=useState(null)
  const handlecurrentuser=async ()=>{
    try{
      const result=await axios.get(`${serverurl}/api/user/current`,{withCredentials:true})
      setuserdata(result.data)
      console.log(result.data)
    } catch(error){
      console.log(error)
    }
  }

    useEffect(()=>{
       handlecurrentuser()
    },[])
  const value={
  serverurl,userdata,setuserdata,backendimage,setbackendimage,frontendimage,setfrontendimage,selectedimage,setselectedimage
  }
  return (
    <div>
      <UserDataContext.Provider value={value}>
        {children}
      </UserDataContext.Provider>
    
    </div>
  )
}

export default Usercontext