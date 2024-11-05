"use server"

import db from "@repo/db/client"

export async function getOnRampTransactions(userid: number) {
  const txns = await db.onRampTransaction.findMany({
    where: { 
      userid 
    },
    orderBy: { 
      id: "desc" 
    },
  });

  return txns
    .filter((t) => t.status === "Success")
    .map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }));
}

export async function fetchOnRampInsights(userId: number){
  try{
    const onRamps = await db.onRampTransaction.findMany({
      where:{
        userid: Number(userId),
        status: "Success"
      },
      select:{
        amount: true,
        startTime: true,
        provider: true
      },
      orderBy:{
        startTime: "asc"
      }
    })

    if(onRamps.length === 0){
      return []
    }

    return onRamps
  } catch(error) {
    console.log("Error fetching onramp transactions", error);

    return []
  }
}