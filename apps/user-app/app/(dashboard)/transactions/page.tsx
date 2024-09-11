import { Transactions } from "../../../components/Transactions"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"

async function bankTransactions(){
    const session = await getServerSession(authOptions);
    const banktxn = await prisma.onRampTransaction.findMany({
      where:{
        userid: Number(session.user.id)
      }
    });
    return banktxn.map(tx => ({
      amount: tx.amount,
      time: tx.startTime,
      status: tx.status
    }))
  }

  async function p2pTransactions(){
    const session = await getServerSession(authOptions);
    const p2ptxn = await prisma.p2pTransfer.findMany({
      where:{
        fromUserId: session.user.fromUserId
      }      
    });
    return p2ptxn.map(tx => ({
      timestamp: tx.timestamp,
      amount: tx.amount
    }))
    }

export default async function () {
  const bank = await bankTransactions();
  const p2p = await p2pTransactions();

  return <div className="w-screen">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
    Recent Transactions
    </div>
    <div className="">
      <Transactions banktxn={bank} p2ptxn={p2p}></Transactions>
    </div>
  </div>

}