import express from 'express'
import { getProducts } from '../services/userServices.js';

const userRouter = express.Router();

userRouter.get("/",getProducts)

export default userRouter