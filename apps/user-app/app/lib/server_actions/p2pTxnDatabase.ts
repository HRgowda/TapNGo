"use server"

import db from "@repo/db/client";
import { getLoggedUser } from "./userDatabase"

interface Balance {
  amount: number;
  userid: number;
}

interface User {
  id: number;
  firstName: string;
}

export async function P2PTransfer(to: number, amount: number) {
  const from = await getLoggedUser();

  if (!from) {
    return {
      message: "Error while sending"
    };
  }

  const toUser = await db.user.findFirst({
    where: {
      id: Number(to)
    }
  });

  if (!toUser) {
    return {
      message: "User not found"
    };
  }

  await db.$transaction(async (tx) => {
    // Lock the sender's balance to ensure atomicity
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userid" = ${Number(from)} FOR UPDATE`;

    const fromBalance = await tx.balance.findUnique({
      where: { userid: Number(from) },
    });

    if (!fromBalance) {
      console.log("From user balance not found");
      throw new Error('Insufficient funds');
    }

    if (fromBalance.amount < amount) {
      console.log("Insufficient funds. Available:", fromBalance.amount, "Requested:", amount);
      throw new Error('Insufficient funds');
    }

    await tx.balance.update({
      where: { userid: Number(from) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userid: toUser.id },
      data: { amount: { increment: amount } },
    });

    await tx.p2pTransfer.create({
      data: {
        fromUserId: Number(from),
        toUserId: toUser.id,
        amount,
        timestamp: new Date()
      }
    });

    console.log("Transfer completed successfully");
  });
}


export async function fetchUserP2PTransactions(loggedUserId: number) {
  const p2ptxn = await db.p2pTransfer.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      OR: [
        { fromUserId: Number(loggedUserId) }, // Logged-in user as sender
        { toUserId: Number(loggedUserId) },   // Logged-in user as receiver
      ],
    },
    include: {
      fromUser: true,
      toUser: true,
    }
  });

  return p2ptxn.map(tx => ({
    id: tx.id,
    date: tx.timestamp,
    amount: tx.amount,
    from: {
      id: tx.fromUser.id,
      name: tx.fromUser.firstName,
    },
    to: {
      id: tx.toUser.id,
      name: tx.toUser.firstName,
    },
  }));
}

export async function getP2PTransactions(fromUserId: number) {
  const transactions = await db.p2pTransfer.groupBy({
    by: ["toUserId"],
    _sum: {
      amount: true
    },
    _count: {
      toUserId: true
    },
    where: {
      fromUserId
    }
  });

  const data = await Promise.all(
    transactions.map(async (item) => {
      const user = await db.user.findUnique({
        where: {
          id: item.toUserId
        },
        select: {
          firstName: true
        }
      });

      return {
        user: user?.firstName || `User ${item.toUserId}`,
        amount: item._sum.amount || 0,
        transactions: item._count.toUserId || 0
      };
    })
  );

  return data;
}
