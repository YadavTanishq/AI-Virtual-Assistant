import express from "express"
import {login,logout,signup} from "../controllers/auth.controllers.js"
const authRouter=express.Router()

authRouter.post("/signup",signup)
authRouter.post("/signin",login)
authRouter.post("/logout",logout)

export default authRouter