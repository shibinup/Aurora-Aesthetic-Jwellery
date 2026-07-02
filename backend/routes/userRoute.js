import express from 'express'
import { getProducts,getTopProducts,userRegister} from '../services/userServices.js';

const userRouter = express.Router();

userRouter.get("/",getTopProducts)
userRouter.get("/getAllProducts",getProducts)
userRouter.post("/register",userRegister)

export default userRouter