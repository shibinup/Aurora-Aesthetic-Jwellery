import express from 'express'
import { getProducts,getTopProducts } from '../services/userServices.js';

const userRouter = express.Router();

userRouter.get("/",getTopProducts)
userRouter.get("/getAllProducts",getProducts)

export default userRouter