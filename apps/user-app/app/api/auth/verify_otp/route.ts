import { NextApiRequest, NextApiResponse } from "next";
import { verifyOtp } from "app/lib/actions/otpService";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "POST"){
    res.status(405).json({
      message: "Method not allowed"
    })
  }

  const {email, otp} = req.body;

  try{
    const isValidOtp = await verifyOtp(email, otp);

    if(isValidOtp){
      res.status(200).json({
        message: "Otp verfied successfully"
      })
    }
  } catch(error){
    console.log(error);
    res.status(400).json({
      message: error
    })
  }
}