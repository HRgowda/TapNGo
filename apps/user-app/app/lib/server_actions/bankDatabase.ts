"use server"

import db from "@repo/db/client";

interface OnRampTransaction {
  id: number;
  startTime: string | Date; 
  amount: number;
  status: string; 
  provider: string;
};

export async function getOnRampTransactions(userid: number) {
  try {
    const txns: OnRampTransaction[] = await db.onRampTransaction.findMany({
      where: { 
        userid 
      },
      orderBy: { 
        id: "desc" 
      },
    });

    return txns
      .filter((t: OnRampTransaction) => t.status === "Success")
      .map((t: OnRampTransaction) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
      }));
  } catch (error) {
    
    console.log("Error fetching onramp transactions", error);

    return [];
  }
}

export async function fetchOnRampInsights(userId: number) {
  try {
    const onRamps = await db.onRampTransaction.findMany({
      where: {
        userid: Number(userId),
        status: "Success"
      },
      select: {
        amount: true,
        startTime: true,
        provider: true
      },
      orderBy: {
        startTime: "asc"
      }
    });

    // If no transactions are found, return an empty array
    if (onRamps.length === 0) {
      return [];
    }

    return onRamps;
  } catch (error) {
    console.log("Error fetching onramp insights", error);

    return [];
  }
}
