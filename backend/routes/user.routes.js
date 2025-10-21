import express from "express"
import { asktoassistant, getcurrentuser, updateassistant } from "../controllers/user.controllers.js"
import isauth from "../middlewares/isauth.js"
import upload from "../middlewares/multer.js"
const userRouter=express.Router()

userRouter.get("/current",isauth,getcurrentuser)
userRouter.post("/update",isauth,upload.single("assistantimage"),updateassistant)

userRouter.post("/asktoassistant",isauth,asktoassistant)
export default userRouter