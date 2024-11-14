import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import db from "@repo/db/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "app/lib/auth";

const otpExpiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10);

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP email
const sendOtpEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in ${otpExpiryMinutes} minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

// Store OTP in the database
const storeOtp = async (email: string, otp: string) => {
  const otpHash = await bcrypt.hash(otp, 10);
  const expireAt = new Date(Date.now() + otpExpiryMinutes * 60 * 1000);

  await db.otp.create({
    data: {
      email,
      otpHashed: otpHash,
      expiresAt: expireAt,
      used: false,
    },
  });
};

export async function POST(req: NextRequest) {

  const { email } = await req.json();
  const otp = generateOtp();
  const session = await getServerSession(authOptions);

  try {

    // Verify if the provided email matches the registered email of the user
    const user = await db.user.findUnique({
      where: { id: Number(session.user?.id) },
      select: { email: true },
    });

    if (!user || user.email !== email) {
      return NextResponse.json(
        { success: false, message: "Provided email does not match the registered email." },
        { status: 400 }
      );
    }

    await sendOtpEmail(email, otp);
    await storeOtp(email, otp);

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error while sending OTP:", error);
    return NextResponse.json(
      { message: "Failed to send OTP, try again later" },
      { status: 500 }
    );
  }
}