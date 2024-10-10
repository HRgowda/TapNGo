"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import db from "@repo/db/client"

interface goalProps {
  userid: number;
  goalAmount: number;
  goalType: string;
  deadline: Date;
}

export async function createDepositGoal({userid, goalAmount, goalType, deadline} : goalProps){

  const session = await getServerSession(authOptions);

  if(!session.user?.id){
    return {
      staus: 200,

      body:{        
        message: "User not logged in"
      }
    };
  }

  await db.depositGoals.create({
    data:{
      userid: userid,
      goalAmount: goalAmount,
      deadline: deadline,
      goalType: goalType
    }
  })

  return {
    status: 200,
    body:{
      message: "Deposit Goal sucessfully created"
    }
  }
}