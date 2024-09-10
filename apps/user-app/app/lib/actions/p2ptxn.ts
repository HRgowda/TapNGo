"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function P2PTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await prisma.$transaction(async (tx) => {
      // Database locks locks the item until one request is processed 
      // Todo: resolve sql inject 
      // using queryRaw because Prisma doesnt support "locks" out of the box so raw query is sent.
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userid" = ${Number(from)} FOR UPDATE`;

        const fromBalance = await tx.balance.findUnique({
            where: { userid: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }
          await new Promise(r => setTimeout(r, 4000));
          await tx.balance.update({
            where: { userid: Number(from) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userid: toUser.id },
            data: { amount: { increment: amount } },
          });

          await tx.p2pTransfer.create({
            data:{
              fromUserId: Number(from),
              toUserId: toUser.id,
              amount,
              timestamp: new Date()
            }
          })
    });
}