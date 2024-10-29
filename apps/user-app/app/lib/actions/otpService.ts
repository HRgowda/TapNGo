"use server"

import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
import db from "@repo/db/client"

const otp_expiry_minutes = parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10);

// configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 456,
  secure: true,
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (email:string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your otp code",
    text: `Your OTP code is ${otp}. It will expire in ${otp_expiry_minutes} minutes`,
  };

  await transporter.sendMail(mailOptions);
}

// storing otp in database
export const storeOtp = async (email: string, otp: string) => {

  const otpHash = await bcrypt.hash(otp, 10);

  const expireAt = new Date(Date.now() + otp_expiry_minutes * 60 * 1000);

  await db.otp.create({
    data:{
      email,
      otpHashed: otpHash,
      expiresAt: expireAt
    }
  });
}

// verify otp
export const verifyOtp = async(email: string, otp: string): Promise<boolean> => {
  const record = await db.otp.findFirst({
    where:{
      email,
      used: false
    },
    orderBy:{
      expiresAt: "desc"
    }
  });

  if(!record) throw new Error("No otp found or already used.")

  if(new Date() > record.expiresAt){
    throw new Error("Opt has expired");
  }
  // verifying otp hash
  const isMatch = await bcrypt.compare(otp, record.otpHashed);
  if(!isMatch){
    throw new Error("Invalid Otp. ");
  }

  await db.otp.update({
    where:{
      id: record.id
    },
    data:{
      used: true
    }
  });

  return true;
}






