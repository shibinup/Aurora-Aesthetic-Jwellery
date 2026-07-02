import nodemailer from "nodemailer";

const sendOTPEmail = async (email, otp) => {
    console.log("send otp called")
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "Your App",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  });
};

export {sendOTPEmail}