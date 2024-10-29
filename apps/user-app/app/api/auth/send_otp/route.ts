import { NextApiRequest, NextApiResponse } from "next";
import { generateOtp, sendOtp, verifyOtp} from "app/lib/actions/otpService"

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "POST"){
    return res.status(405).json({
      message: "Method not allowed"
    })
  }

  const {email} = req.body;

  try{
    const otp = generateOtp();
    const sendotp = sendOtp(email, otp);
    const verifyotp = verifyOtp(email, otp);

    res.status(200).json({
      message: "Otp sent successfully"
    });
  } catch(error){
    console.log(error);
    res.status(500).json({
      message: "Failed to send otp."
    })
  }
}