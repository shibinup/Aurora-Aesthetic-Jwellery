import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js';
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js';
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin/",adminRouter);
app.use("/api/user/",userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});