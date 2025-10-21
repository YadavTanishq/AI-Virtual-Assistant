import User from "../models/user.model.js"
import uploadoncloudinary from "../config/cloudinary.js"
import geminiresponse from "../gemini.js"
 import moment from "moment"
import { response } from "express"
export const getcurrentuser=async (req,res)=>{
    try{
       const userId=req.userId
       const user=await User.findById(userId).select("-password")
       if(!user){
        return res.status(400).json({message:"user not found"})
       }
       return res.status(200).json(user)
    } catch(error){
        return res.status(400).json({message:"get current user error"})
    }
}


export const updateassistant=async (req,res)=>{
    try{
     const {assistantname,imageUrl}=req.body
     let assistantimage;
     if(req.file){
        assistantimage=await uploadoncloudinary(req.file.path)
     } else{
        assistantimage=imageUrl
     }

     const user =await User.findByIdAndUpdate(req.userId,{
        assistantname,assistantimage
     },{new:true}).select("-password")
     return res.status(200).json(user)
    } catch(error){
      return res.status(400).json({message:"updateAssistanterror"})
    }
}


export const asktoassistant=async (req,res)=>{
   try{
      const {command}=req.body
     const user=await User.findById(req.userId);
     user.history.push(command)
     user.save()
      if (!user) {
      return res.status(404).json({ response: "User not found." });
    }

     const username=user.name
     const assistantname=user.assistantname

     const result=await geminiresponse(command,assistantname,username)

     const jsonmatch=result.match(/{[\s\S]*}/)
     if(!jsonmatch){
      return res.status(400).json({response:"sorry,i can't understand"})
     }
     const gemresult=JSON.parse(jsonmatch[0])
     const type=gemresult.type

     switch(type){
      case 'get_date':
         return res.json({
            type,
            userinput:gemresult.userinput,
            response:`current date is ${moment().format("YYYY-MM-DD")}`
         });
         case 'get_time':
            return res.json({
            type,
            userinput:gemresult.userinput,
            response:`current time is ${moment().format("hh:mm A")}`
         });
         case 'get_day':
            return res.json({
            type,
            userinput:gemresult.userinput,
            response:`current day is ${moment().format("dddd")}`
         });
         case 'get_month':
            return res.json({
            type,
            userinput:gemresult.userinput,
            response:`current month is ${moment().format("MMMM")}`
         });
         case 'google_search':
case 'youtube_search':
case 'youtube_play':
case "general":
case "calculator_open":
case "instagram_open":
case "facebook_open":
case "weather_show" :
return res.json({
type,
userinput:gemresult.userinput, 
response:gemresult.response,
})

default:
   return res.status(400).json({response:"I didn't understand that command."})
} 
   }catch(error){
      return res.status(500).json({response:"ask assistant error"})
   }
}