"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

interface OnRampTransactionResponse {
  status: number;
  body: {
    message: string;
    token?: string;
  };
}

export async function OnRampTransaction(inputAmount: number, provider: string): Promise<OnRampTransactionResponse> {
  const session = await getServerSession(authOptions);
  const userid = session?.user?.id;

  if (!userid) {
    return {
      status: 401,
      body: {
        message: "User not logged in",
      },
    };
  }

  if (inputAmount <= 0) {
    return {
      status: 400,
      body: {
        message: "Please enter a valid inputAmount.",
      },
    };
  } else if (inputAmount > 15000) {
    return {
      status: 400,
      body: {
        message: "Amount should be less than Rs 15,000",
      },
    };
  }

  try {
    const token = generateToken(); // Generate the token

    await prisma.onRampTransaction.create({
      data: {
        userid: Number(userid),
        amount: inputAmount,
        provider,
        token: token,
        startTime: new Date(),
        status: "Processing",
      },
    });

    return {
      status: 200,
      body: {
        message: "Bank transaction initiated, Directing to new page please wait",
        token: token, // Include the token in the response
      },
    };
  } catch (error) {
    console.error("Transaction error:", error);
    return {
      status: 500,
      body: {
        message: "Internal server error.",
      },
    };
  }
}

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
