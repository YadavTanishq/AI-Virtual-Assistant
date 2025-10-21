import { useContext, useEffect, useState, useRef } from 'react'
import { UserDataContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import aiimg from "../assets/ai.gif"
import userimg from "../assets/user.gif"
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"

const Home = () => {
  const { userdata, serverurl, setuserdata, getgeminiresponse } = useContext(UserDataContext)
  const navigate = useNavigate()
  const [listening, setlistening] = useState(false)
  const [usertext, setusertext] = useState("")
  const [aitext, setaitext] = useState("")
  const isspeakingref = useRef(false)
  const recognitionref = useRef(null)
  const [ham, setham] = useState(false)
  const isrecognizingref = useRef(false)
  const synth = window.speechSynthesis

  const handlelogout = async () => {
    try {
      await axios.get(`${serverurl}/api/auth/logout`, { withCredentials: true })
      setuserdata(null)
      localStorage.removeItem('userdata')
      navigate("/signin")
    } catch (error) {
      setuserdata(null)
      localStorage.removeItem('userdata')
      console.log(error)
    }
  }

  const startrecognition = () => {
    if (!isrecognizingref.current && !isspeakingref.current) {
      try {
        recognitionref.current?.start()
        console.log("Recognition requested to start")
      } catch (error) {
        if (error.name !== "InvalidStateError") {
          console.error("Start error:", error)
        }
      }
    }
  }

  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text)
    utterence.lang = 'hi-IN'
    const voices = window.speechSynthesis.getVoices()
    const hindivoice = voices.find(v => v.lang === 'hi-IN')
    if (hindivoice) utterence.voice = hindivoice

    isspeakingref.current = true
    utterence.onend = () => {
      setaitext("")
      isspeakingref.current = false
      setTimeout(() => {
        startrecognition()
      }, 800)
    }

    synth.cancel()
    synth.speak(utterence)
  }

  const handlecommand = (data) => {
    const { type, userinput, response } = data
    speak(response)

    if (type === "google_search") {
      const query = encodeURIComponent(userinput)
      window.open(`https://www.google.com/search?q=${query}`, '_blank')
    }
    if (type === "calculator_open") {
      window.open(`https://www.google.com/search?q=calculator`, '_blank')
    }
    if (type === "instagram_open") {
      window.open(`https://www.instagram.com/`, '_blank')
    }
    if (type === "facebook_open") {
      window.open(`https://www.facebook.com/`, '_blank')
    }
    if (type === "weather_show") {
      window.open(`https://www.google.com/search?q=weather`, '_blank')
    }
    if (type === 'youtube_search' || type === 'youtube_play') {
      const query = encodeURIComponent(userinput)
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank')
    }
  }

  useEffect(() => {
    if (!userdata) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognitionref.current = recognition

    let ismounted = true
    const starttimeout = setTimeout(() => {
      if (ismounted && !isspeakingref.current && !isrecognizingref.current) {
        try {
          recognition.start()
          console.log("Recognition requested to start")
        } catch (e) {
          if (e.name !== "InvalidStateError") console.error(e)
        }
      }
    }, 1000)

    recognition.onstart = () => {
      isrecognizingref.current = true
      setlistening(true)
    }

    recognition.onend = () => {
      isrecognizingref.current = false
      setlistening(false)
      if (ismounted && !isspeakingref.current) {
        setTimeout(() => {
          if (ismounted) {
            try {
              recognition.start()
              console.log("Recognition restarted")
            } catch (e) {
              if (e.name !== "InvalidStateError") console.error(e)
            }
          }
        }, 1000)
      }
    }

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error)
      isrecognizingref.current = false
      setlistening(false)
      if (event.error !== "aborted" && ismounted && !isspeakingref.current) {
        setTimeout(() => {
          if (ismounted) {
            try {
              recognition.start()
              console.log("Recognition restarted after error")
            } catch (e) {
              if (e.name !== "InvalidStateError") console.error(e)
            }
          }
        }, 1000)
      }
    }

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim()
      console.log("Heard:", transcript)

      if (transcript.toLowerCase().includes(userdata.assistantname.toLowerCase())) {
        setaitext("")
        setusertext(transcript)
        recognition.stop()
        isrecognizingref.current = false
        setlistening(false)
        const data = await getgeminiresponse(transcript)
        console.log("Gemini data:", data)
        handlecommand(data)
        setaitext(data.response)
        setusertext("")
      }
    }

    const greeting = new SpeechSynthesisUtterance(`Hello ${userdata.name}, what can I help you with?`)
    greeting.lang = 'hi-IN'
    window.speechSynthesis.speak(greeting)

    return () => {
      ismounted = false
      clearTimeout(starttimeout)
      recognition.stop()
      setlistening(false)
      isrecognizingref.current = false
    }
  }, [userdata])

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030348] flex justify-center items-center flex-col gap-[15px] overflow-hidden relative">
      <RxHamburgerMenu
        className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] cursor-pointer'
        onClick={() => setham(true)}
      />

      <div className={`absolute top-0 right-0 h-full w-1/4 bg-[#00000053] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start 
        ${ham ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out overflow-y-auto`}>
        
        <RxCross1
          className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] cursor-pointer'
          onClick={() => setham(false)}
        />

        <button
          className="min-w-[150px] h-[60px] text-black cursor-pointer bg-white font-semibold rounded-full text-[19px]"
          onClick={handlelogout}
        >
          Log out
        </button>

        <button
          className="min-w-[150px] h-[60px] text-black bg-white font-semibold rounded-full text-[19px] cursor-pointer px-[20px] py-[10px]"
          onClick={() => navigate("/customize")}
        >
          Customize your Assistant
        </button>

        <div className='w-full'>
  <h1 className='text-white font-semibold text-[19px] mb-[10px]'>History</h1>
  <div className='w-full max-h-[500px] overflow-y-auto flex flex-col gap-[10px] pr-[5px]'>
    {userdata.history?.length > 0 ? (
      userdata.history.map((his, i) => (
        <span key={i} className='text-gray-200 text-[17px] break-words'>
          {his}
        </span>
      ))
    ) : (
      <span className='text-gray-400 text-[16px] italic'>No history yet</span>
    )}
  </div>
</div>
      </div>

      <div className='w-[280px] h-[320px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
        <img src={userdata?.assistantimage} alt="" className='h-full object-cover' />
      </div>
      <h1 className='text-white text-[18px] font-semibold'>I'm {userdata?.assistantname}</h1>
      {!aitext && <img src={userimg} alt='' className='w-[200px]' />}
      {aitext && <img src={aiimg} alt='' className='w-[200px]' />}
      <h1 className='text-white text-[20px] font-semibold text-wrap'>{usertext || aitext || null}</h1>
    </div>
  )
}

export default Home
