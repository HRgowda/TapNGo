"use server"

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";

// Define the return type of the getLoggedUser function
export async function getLoggedUser(): Promise<number | undefined> {
  const session = await getServerSession(authOptions);
  return session?.user.id;
}

// Define types for balance data and user
interface Balance {
  amount: number;
  locked: number;
}

export async function getUserBalance(userId: number): Promise<Balance> {
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

interface Card {
  id: number;
  cardNumber: string;
  expiryDate: string;
}

interface UserWithCard {
  fullName: string;
  card: Card | null;
}

export async function getUserWithCard(userId: number): Promise<UserWithCard | null> {
  const userData = await db.user.findFirst({
    where: { 
      id: Number(userId) 
    },
    include: { 
      Card: true 
    },
  });

  if (!userData || !userData.Card[0]) return null;

  return {
    fullName: `${userData.firstName} ${userData.lastName || ''}`.trim(),
    card: userData.Card[0], // Assuming we only need the first card
  };
}

interface DepositGoal {
  id: number;
  goalAmount: number;
  currentSaving: number;
  deadline: Date;
  goalType: string;
}

interface UserDataWithDepositGoals {
  firstName: string;
  DepositGoals: DepositGoal[];
}

export async function getUserDataWithDepositGoals(id: number): Promise<UserDataWithDepositGoals | null> {
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
    DepositGoals: data.goals.map((goal: any) => ({
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

  return users.map((user :any) => ({
    id: user.id,
    firstName: user.firstName,
  }));
}

export async function fetchAllUsersExceptCurrent(){
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

  return users.map((user :any) => ({
    id: user.id,
    firstName: user.firstName,
  }));
}

interface Transaction {
  firstName: string;
  id: number;
}

export async function fetchUserTransactions(): Promise<Transaction[]> {
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

  return transactions
    .map((t: any): Transaction | undefined => t.toUser)
    .filter((user): user is Transaction => user !== undefined);
}

export async function fetchUserBalance(): Promise<any> {
  const loggedUser = await getLoggedUser();

  return await db.balance.findFirst({
    where: {
      userid: Number(loggedUser),
    },
  });
}
