import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@repo/db/client";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  try {
    const record = await db.otp.findFirst({
      where: {
         email, 
         used: false 
      },
      orderBy: { 
        expiresAt: "desc" 
      },
    });

    if (!record) {
      return NextResponse.json({
         success: false,
        message: "No OTP found or already used."
       }, 
       {
         status: 400 
      });
    }

    if (new Date() > record.expiresAt) {
      await db.otp.delete({ 
        where: { id: record.id } 
      });
      return NextResponse.json({
        success: false,
        message: "OTP has expired, please try again." 
      }, 
      { 
        status: 400 
      });
    }

    const isMatch = await bcrypt.compare(otp, record.otpHashed);
    if (!isMatch) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid OTP, Please enter the valid OTP." 
      }, 
      { 
        status: 400 
      });
    }

    await db.otp.update({ 
      where: { 
        id: record.id 
      }, 
      data: { 
        used: true 
      } 
    });

    await db.otp.delete({
      where:{
        id: record.id
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: "OTP verified successfully!" 
    }, 
    {
       status: 200 
    });
  } catch (error) {
    console.error("Error while verifying OTP:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to verify OTP, please try again later." 
    }, 
    { 
      status: 500 
    });
  }
}
