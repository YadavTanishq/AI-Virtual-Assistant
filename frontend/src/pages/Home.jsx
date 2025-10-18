import React, { useContext } from 'react'
import { UserDataContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {userdata,serverurl,setuserdata} =useContext(UserDataContext)
  const navigate=useNavigate()

  const handlelogout=async ()=>{
    try{
      const result=await axios.get(`${serverurl}/api/auth/logout`,{withCredentials:true})
      setuserdata(null)
       localStorage.removeItem('userdata') 
      navigate("/signin")
    } catch(error){
      setuserdata(null)
       localStorage.removeItem('userdata') 
      console.log(error)

    }
  }
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030348] flex justify-center items-center flex-col gap-[15px]">
      <button className="min-w-[150px] h-[60px] text-black bg-white font-semibold rounded-full text-[19px] cursor-pointer absolute top-[20px] right-[20px]" onClick={handlelogout}>Log out</button>
      <button className="min-w-[150px] h-[60px] text-black bg-white font-semibold rounded-full text-[19px] cursor-pointer absolute top-[100px] right-[20px] px-[20px] py-[20px]" onClick={()=>{
        navigate("/customize")
      }}>Customize your Assistant</button>
        <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
          <img src={userdata?.assistantimage} alt="" className='h-full object-cover'/>
        </div>
        <h1 className='text-white text-[18px] font-semibold'>I'm {userdata?.assistantname}</h1>
        
    </div>
  )
}

export default Home