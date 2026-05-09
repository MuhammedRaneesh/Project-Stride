import { registerSchema , loginSchema } from "../validation/authValidation.js";
import express from "express"
import { registerUser  , loginUser , logout } from "../controllers/authController.js";
import { validate } from "../middleware/validateMiddleware.js";



const router = express.Router()

router.post("/register" , validate(registerSchema) , registerUser) 

router.post("/login" , validate(loginSchema) , loginUser)

router.delete("/logout" , logout )


export default router
