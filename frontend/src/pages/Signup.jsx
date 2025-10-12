import { useState } from "react";
import bg from "../assets/authbg.png"
import { IoMdEye,IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Signup() {
    const [showPassword,setshowPassword]=useState(false)
    const navigate=useNavigate()
    const [name,setname]=useState("")
      const [email,setemail]=useState("")
        const [password,setpassword]=useState("")
        const handlesignup=async ()=>{
            
        }
  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center' style={{backgroundImage:`url(${bg})`}}>
   <form className='w-[90%] h-[600px] max-w-[550px] bg-[#00000062] backdrop-blur shadow-lg shadow-blue-950 flex flex-col items-center justify-center gap-[20px] mt-20 px-20'>
    <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Register to <span className='text-blue-400'>Virtual Assistant</span></h1>
    <input type="text" placeholder='Enter your Name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-grey-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setname(e.target.value)} value={name}/>
    <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setemail(e.target.value)} value={email}/>
    <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
        <input type={showPassword?"text":"password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-grey-300 px-[20px] py-[10px]' required onChange={(e)=>setpassword(e.target.value)} value={password}/>
        {!showPassword && <IoMdEye className="absolute top-[15px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer" onClick={()=>setshowPassword(true)}/>}
             {showPassword && <IoMdEyeOff className="absolute top-[15px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer" onClick={()=>setshowPassword(false)}/>}
    </div>
    <button className="min-w-[150px] h-[60px] text-black bg-white font-semibold rounded-full text-[19px]">Sign Up</button>
    <p className="text-[white] text-[18px] cursor-pointer" onClick={()=>navigate("/signin")}>Already have an account ? <span className="text-blue-400 ">Sign In</span></p>
   </form>
    </div>
  )
}

export default Signup