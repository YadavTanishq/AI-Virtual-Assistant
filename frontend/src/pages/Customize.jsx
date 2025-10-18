import React, { useContext, useRef, useState } from 'react'
import { LuImagePlus } from "react-icons/lu";
import { IoArrowBackSharp } from "react-icons/io5";
import Card from '../components/Card'
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.webp'
import image4 from '../assets/image4.jpg'
import image5 from '../assets/image5.webp'
import image6 from '../assets/image6.webp'
import image7 from '../assets/image7.webp'
import { UserDataContext } from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';
function Customize () {
  const {serverurl,userdata,setuserdata,backendimage,setbackendimage,frontendimage,setfrontendimage,selectedimage,setselectedimage}=useContext(UserDataContext)
  const navigate =useNavigate()
  const inputimage=useRef()
  const handleimage=(e)=>{
    const file=e.target.files[0]
    setbackendimage(file)
    setfrontendimage(URL.createObjectURL(file))
  }
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]">
      <IoArrowBackSharp className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>{
              navigate("/")
            }}/>
      <h1 className='text-white mb-[40px] text-[30px] text-center p-[20px] gap-[20px]'>Select your  <span className='text-blue-200'>Assistant Image</span></h1>
       <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
        <Card image={image1}/>
         <Card image={image2}/>
          <Card image={image3}/>
          <Card image={image4}/>
           <Card image={image5}/>
            <Card image={image6}/>
             <Card image={image7}/>
             <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030323] border-2 border-[#0000ffaf] rounded-2xl overflow-hidden hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${selectedimage=="input"?"border-4 border-white shadow-2xl shadow-blue-950 ":null}`} onClick={()=>{
              inputimage.current.click()
              setselectedimage("input")
             }
             }>
              {!frontendimage &&
       <LuImagePlus className='text-white w-[25px] h-[25px]'/>}
       {frontendimage && <img src={frontendimage} className='h-full object-cover'/>}
    </div>
    <input type='file' accept='image/*' hidden ref={inputimage} onChange={handleimage}/>
       </div>
       {selectedimage && <button className='min-w-[150px] h-[60px] text-black bg-white font-semibold rounded-full text-[19px] cursor-pointer mt-[20px]' onClick={()=>navigate("/customize2")}>Next</button>
}
    </div>
  )
}

export default Customize