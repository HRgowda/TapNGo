"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

interface OnRampTransactionResponse {
  status: number;
  body: {
    message: string;
  };
}

export async function OnRampTransaction(inputAmount: number, provider: string, pin: string): Promise<OnRampTransactionResponse> {
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

  if (inputAmount <= 0 || inputAmount > 15000) {
    return {
      status: 400,
      body: {
        message: "Please enter a valid inputAmount.",
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userid),
    },
    select: {
      pin: true,
    },
  });

  if (!user) {
    return {
      status: 404,
      body: {
        message: "User not found.",
      },
    };
  }

  if (user.pin !== pin) {
    return {
      status: 403,
      body: {
        message: "Invalid PIN, Please enter a valid pin.",
      },
    };
  }

  try {
    const token = generateToken(); // Use a better token generation method

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

    await prisma.$transaction(async (tx) => {
      await tx.balance.update({
        where:{
          id: Number(session.user.id)
        },
        data:{
          amount: {
            increment: inputAmount
          }
        }
      })
    })

    return {
      status: 200,
      body: {
        message: "On ramp transaction added",
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
