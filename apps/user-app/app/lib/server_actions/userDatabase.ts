"use server"

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";

export async function getLoggedUser() {
  const session = await getServerSession(authOptions);
  return session?.user.id;
}

export async function getUserBalance(userId: number) {
  const balanceData = await db.balance.findUnique({
    where: { 
      userid: Number(userId) 
    },
  });

  return {
    amount: balanceData?.amount || 0,
    locked: balanceData?.locked || 0
  }
}

export async function getUserWithCard(userId: number) {
  const userData = await db.user.findFirst({
    where: { 
      id: Number(userId) 
    },
    include: { 
      Card: true 
    },
  });

  if (!userData) return null;

  return {
    fullName: `${userData.firstName} ${userData.lastName || ''}`.trim(),
    card: userData.Card[0], // Assuming we only need the first card
  };
}

export async function getUserDataWithDepositGoals(id: number) {
  const data = await db.user.findUnique({
    where: { 
      id: Number(id)
    },
    include: { 
      goals: true
    },
  });

  if (!data) return null;

  return {
    firstName: data.firstName,
    DepositGoals: data.goals.map((goal) => ({
      id: goal.id,
      goalAmount: goal.goalAmount,
      currentSaving: goal.currentSavings,
      deadline: goal.deadline,
      goalType: goal.goalType,
    })),
  };
}

export async function fetchUsersExceptCurrentUser() {
  const loggedUser = await getLoggedUser();

  const users = await db.user.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      firstName: true,
      id: true,
    },
    where: {
      id: {
        not: Number(loggedUser),
      },
    },
    take: 5
  });

  return users.map(user => ({
    id: user.id,
    firstName: user.firstName,
  }));
}

export async function fetchAllUsersExceptCurrent() {
  const loggedUser = await getLoggedUser();

  const users = await db.user.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      firstName: true,
      id: true,
    },
    where: {
      id: {
        not: Number(loggedUser),
      },
    },
  });

  return users.map(user => ({
    id: user.id,
    firstName: user.firstName,
  }));
}

export async function fetchUserTransactions() {
  const loggedUser = await getLoggedUser();

  const transactions = await db.p2pTransfer.findMany({
    where: {
      fromUserId: Number(loggedUser),
    },
    select: {
      toUser: {
        select: {
          firstName: true,
          lastName: true,
          id: true,
        },
      },
    },
    take: 5
  });

  // This check is to filter if any toUser data is undefined so that it encounters runtime error since the value would be undefined so the filter() function would remove all the values of undefined in the userTransactions array.

  return transactions
    .map(t => t.toUser)
    .filter(user => user !== undefined) as { firstName: string; id: number }[];
}

export async function fetchUserBalance() {
  const loggedUser = await getLoggedUser();

  return await db.balance.findFirst({
    where: {
      userid: Number(loggedUser),
    },
  });
}
