import express from 'express'
import { addProduct } from '../services/adminServices.js';
const adminRouter = express.Router();

adminRouter.post("/addProduct",addProduct)

export default adminRouter