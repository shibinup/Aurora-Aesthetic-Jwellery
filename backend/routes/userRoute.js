import express from 'express'
import { getProducts,getTopProducts,userRegister,verifyOTP} from '../services/userServices.js';

const userRouter = express.Router();

userRouter.get("/",getTopProducts)
userRouter.get("/getAllProducts",getProducts)
userRouter.post("/register",userRegister)
userRouter.post("/verifyOtp",verifyOTP)

export default userRouter