"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

interface GoalProps {
  userId: number;
  goalAmount: number;
  type: string;
  deadline?: Date; // Optional for adding or withdrawing
  action: "create" | "add" | "withdraw";
}

export async function handleDepositGoal({ userId, goalAmount, type, deadline, action }: GoalProps) {
  const session = await getServerSession(authOptions);

  if (!session.user?.id) {
    return {
      status: 401,
      body: {
        message: "User not logged in",
      },
    };
  }

  const existingGoal = await db.depositGoals.findUnique({
    where: {
      userid_goalType: { 
        userid: userId, 
        goalType: type }, // Composite key
    },
  });

  if (action === "create") {
    // If the goal already exists, then no duplicate creation
    if (existingGoal) {
      return {
        status: 400,
        body: {
           message: "Goal already exists for this type" 
          },
      };
    }
    // Create a new deposit goal
    await db.depositGoals.create({
      data: {
        userid: userId,
        goalAmount,
        currentSavings: 0, // Initialize with zero savings
        goalType: type,
        deadline: deadline || new Date(), // Default deadline to now if not provided
      },
    });

    return {
      status: 200,
      body: { 
        message: "New deposit-goal successfully created"
       },
    };
  }
  
  const userGoals = await db.depositGoals.findMany({
    where: { userid: userId },
  });
  console.log("User Goals:", userGoals);

  if (!existingGoal) {
    return {
      status: 404,
      body: { 
        message: "Goal not found for this user and goal-type"
       },
    };
  }

  if (action === "add") {
    console.log("Leo messi")
    // Increment the savings for the existing goal
    const currentBalance = await db.balance.findFirst({
      where:{
        userid: userId
      }
    })

    const balanceData = currentBalance?.amount || 0;

    if(balanceData < goalAmount){
      return {
        status: 400,
        body:{
          message: "Insufficient funds in your wallet"
        }
      }
    }

    await db.$transaction(async (db) => {

      await db.depositGoals.update({
        where: {
          userid_goalType: { 
            userid: userId, 
            goalType: type },
        },
        data: {
          currentSavings: { 
            increment: goalAmount 
          },
        },
      });
  
      await db.balance.update({
        where:{
          userid: userId
        },
        data:{
          amount: {
            decrement: goalAmount
          }
        }
      })
      console.log("Success")
    })
    return {
      status: 200,
      body: {
         message: `Successfully added Rs ${goalAmount} to your savings` 
        },
    };
  }

  if (action === "withdraw") {
    // Ensure sufficient savings exist for withdrawal
    if (existingGoal.currentSavings < goalAmount) {
      return {
        status: 400,
        body: {
           message: "Insufficient savings for withdrawal" 
          },
      };
    }

    // Decrement the savings for the goal
    await db.$transaction(async (db)=> {

      await db.depositGoals.update({
        where: {
          userid_goalType: {
             userid: userId, 
             goalType: type 
            },          
        },
        data: {
          currentSavings: { 
            decrement: goalAmount 
          },
        },
      });

      await db.balance.update({
        where:{
          userid: userId
        },
        data:{
          amount:{
            increment: goalAmount
          }
        }
      })
      
    })

    return {
      status: 200,
      body: {
         message: `Successfully withdrawn Rs ${goalAmount} to your wallet`
         },
    };
  }

  console.log("Failure")
  return {
    status: 400,
    body: {
       message: "Invalid action" 
      },
  };
}
