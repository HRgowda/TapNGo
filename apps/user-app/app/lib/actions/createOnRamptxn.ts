"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function OnRampTransaction(amount: number, provider: string){

  const session = await getServerSession(authOptions);
  const userid = session.user.id;
  const token = Math.random().toString();
  if (!userid){
    return {
      message: "User not logged in"
    }
  }

  await prisma.onRampTransaction.create({
    data:{
      userid:Number(userid),
      amount, 
      provider,
      token: token,
      startTime: new Date(),
      status: "Processing",
    }
  })

  return {
    message: "On ramp transaction added"
  }
}