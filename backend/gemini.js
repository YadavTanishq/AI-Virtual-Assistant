import axios from "axios"
const geminiresponse=async (prompt)=>{
    try{
     const apiurl=process.env.GEMINI_API_URL
     const result=await axios.post(apiurl,{
         "contents": [
      {
        "parts": [
          {
            "text": "prompt"
          }
        ]
      }
    ]
     })
     return result.data
    } catch(error){
     console.log(error)
    }
}

export default geminiresponse