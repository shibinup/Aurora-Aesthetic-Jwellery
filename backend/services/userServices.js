import Product from "../model/productSchema.js";
import Tempuser from "../model/tempUserSchema.js";
import User from "../model/userSchema.js";
import { generateOTP } from "../utilities/generateOtp.js";
import { sendOTPEmail } from "../utilities/sendOtp.js";
import generateToken from "../utilities/generateJwtTokenUser.js";
import bcrypt from 'bcrypt'


const userRegister = async(req,res)=>{
    console.log("called")
    console.log("req body iss",req.body)
    try {
            // 1. Get data from frontend
    const { name, email, password } = req.body;

    // 2. Check all fields entered
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    const existingUser = await User.findOne({ email });
  

    
   if (existingUser ) {
     return res.status(400).json({
    success: false,
    message: "User already exists",
     });

  }

  const tempexistingUser = await Tempuser.findOne({ email });
     if (tempexistingUser ) {
     return res.status(400).json({
      success: false,
       message: "try after 30 seconds",
     });

  }


  
    const otp =  generateOTP()
    console.log("pass otp",otp)
    console.log("type of original",typeof otp)
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min

    
    //here setting a  tempuser in user database before otp verification
    const newUser = await Tempuser.create({
      name,
      email,
      password: password,
      otp:otp
    });

    //here sending otp
     await sendOTPEmail(email,otp)
     console.log("finih register work")




      return res.status(201).json({
      success: true,
      message: "temporary user creayed successful",
      user: newUser,
      isVerified:false,
      otp:otp,
      otpExpiry:otpExpiry
    })

    } catch (error) {
        console.log("shiu error is ",error)
        return res.status(400).json({
        success: false,
        message: "have error",
      });
    }
}

const verifyOTP = async (req, res) => {
   
      console.log("verify otp called ")
  try {
        const { email,password, otp } = req.body;
        console.log("eee",email,password,otp)
        console.log("enetred otp",otp)
        console.log("type of enetred otp is", typeof otp)
        
         const salt = await bcrypt.genSalt(10); 
         
          
         const user = await Tempuser.findOne({ email:email});
       

  if (!user) return res.status(400).json({ success:false,message: "User not found" });
  const isMatch = await bcrypt.compare(password,user.password);
  if (!isMatch) {
    return res.status(401).json({ success:false , message: " password" });
}

   console.log("user.otp is ",user.otp)
  if (Number(user.otp) !== Number(otp)) {
    return res.status(400).json({ success:false,message: "Wrong OTP" });
  }

  
   const newUser = await User.create({
      name:user.name,
      email,
      password: user.password,
    });
    await Tempuser.deleteOne({ _id: user._id })

     const token = generateToken(newUser._id);
      console.log("token generated",token)

      res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
   console.log("cookie set")

  return res.json({
    success:true,
    message: "Account verified and signup successfully ",
  });
  } catch (error) {
    console.log("shibu have errror in verify otp",error)
     return res.status(400).json({
        success: false,
        message: error,
      });

  }


};



const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(20);;
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export {getTopProducts,getProducts,userRegister,verifyOTP}